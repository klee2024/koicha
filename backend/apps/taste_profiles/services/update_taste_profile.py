
from __future__ import annotations
from apps.taste_profiles.models import TasteProfile
from apps.products.models import Product

from dataclasses import dataclass
import logging
from typing import Dict, Iterable, Tuple

from django.db import transaction
from django.db.models import Q

from apps.taste_profiles.models import TasteProfile, TasteProfileFlavorDimension, FlavorCharacteristic
from apps.products.models import ProductTaste

logger = logging.getLogger(__name__)

def clamp01(x: float) -> float:
    return 0.0 if x < 0.0 else 1.0 if x > 1.0 else x


def rating_to_weight(rating: int, gamma: float = 1.5) -> float:
    """
    Map rating 0..100 into signed weight [-1,1] where 50 is neutral.
    gamma>1 makes mild ratings matter less.
    """
    w = (rating - 50) / 50.0  # [-1, 1]
    if w == 0:
        return 0.0
    return (abs(w) ** gamma) * (1.0 if w > 0 else -1.0)


def learning_rate(confidence: float, alpha0: float = 0.25, k: float = 5.0) -> float:
    """
    Decay learning rate as confidence grows.
    """
    return alpha0 / (1.0 + (confidence / k))


def normalize_product_tastes(
    tastes: Iterable[Tuple[int, int]]
) -> Dict[int, float]:
    """
    tastes: iterable of (characteristic_id, intensity_0_100)
    Returns normalized vector f where values sum to 1 across present dims.
    Missing dims are implicitly 0 (not returned).
    """
    raw = {cid: intensity / 100.0 for cid, intensity in tastes if intensity > 0}
    s = sum(raw.values())
    if s <= 0:
        return {}
    return {cid: v / s for cid, v in raw.items()}


@transaction.atomic
def apply_review_to_taste_profile(review):
    """
    Updates a user's taste profile based on a new product rating
    """

    # TODO: consider how to handle this - a user should always have a taste profile (created upon user creation)
    # get the user's taste profile
    taste_profile, _created = TasteProfile.objects.get_or_create(
        user=review.user,
        defaults={"is_system": False},
    )

    # find active main dimensions (parent is null)
    active_main_dims = list(
        FlavorCharacteristic.objects.filter(is_active=True, parent__isnull=True)
        .values_list("id", flat=True)
    )

    # ensure TasteProfileFlavorDimension rows exist for all active mains
    existing_dim_ids = set(
        TasteProfileFlavorDimension.objects.filter(taste_profile=taste_profile, characteristic_id__in=active_main_dims)
        .values_list("characteristic_id", flat=True)
    )
    missing = [characteristic for characteristic in active_main_dims if characteristic not in existing_dim_ids]
    if missing:
        TasteProfileFlavorDimension.objects.bulk_create([
            TasteProfileFlavorDimension(
                taste_profile=taste_profile,
                characteristic_id=characteristic,
                value=50,
                confidence=0.0,
            )
            for characteristic in missing
        ])

       # 3) Build normalized product vector f from ProductTaste (only active mains)
    product_tastes = list(
        ProductTaste.objects.filter(product_id=review.product, taste_dimension_id__in=active_main_dims)
        .values_list("taste_dimension_id", "intensity")
    )

    logger.info(
            "Product tastes",
            extra={
                "product": review.product.name,
                "review_id": review.id,
                "user_id": review.user_id,
                "product_tastes": product_tastes
            },
        )

    normalized_product_tastes = normalize_product_tastes(product_tastes)

    if not normalized_product_tastes:
        logger.error(
            "Taste profile update skipped: product has no flavor dimensions",
            extra={
                "product_id": review.product_id,
                "review_id": review.id,
                "user_id": review.user_id,
            },
        )
        return taste_profile
    
    # 4) Convert rating to signed weight
    w = rating_to_weight(int(review.user_rating), gamma=1.5)
    if w == 0.0:
        logger.info(
            "Taste profile update skipped: neutral product rating",
            extra={
                "product_id": review.product_id,
                "review_id": review.id,
                "user_id": review.user_id,
            },
        )
        return taste_profile  # neutral rating doesn't change profile


    # 5) Update only taste profile dimensions present in the product's dimensions
    dims_to_update = list(
        TasteProfileFlavorDimension.objects.select_for_update()
        .filter(taste_profile=taste_profile, characteristic_id__in=normalized_product_tastes.keys())
    )

    # update the user's taste profile dimensions using ... algo 
    for dim in dims_to_update: 
        u = dim.value / 100.0
        target = normalized_product_tastes[dim.characteristic_id]
        alpha = learning_rate(dim.confidence, alpha0=0.25, k=5.0)
        # u <- u + alpha*w*(target - u)
        u2 = clamp01(u + alpha * w * (target - u))

        dim.value = int(round(u2 * 100.0))

        # confidence grows faster when:
        # - rating is strong (abs(w))
        # - the product expresses this dimension strongly (target)
        dim.confidence += abs(w) * target

    TasteProfileFlavorDimension.objects.bulk_update(dims_to_update, ["value", "confidence"])

    return taste_profile





