
from __future__ import annotations
from apps.taste_profiles.models import TasteProfile
from apps.products.models import Product

from dataclasses import dataclass
import logging

from django.db import transaction
from django.db.models import Count

from apps.taste_profiles.models import TasteProfile, TasteProfileFlavorDimension, FlavorCharacteristic
from apps.products.models import ProductTaste
from apps.reviews.models import Review
from .utils import get_or_create_profile_with_defaults

logger = logging.getLogger(__name__)

@transaction.atomic
def apply_review_to_taste_profile(review):
    """
    Updates a user's taste profile based on a new product rating
    By averaging the user's rating of the products they have rated across the active main taste dimensions
    Ex: If a user ranks a floral and creamy product a 76%, the 76% should be factored into their floral and creamy scores
    """

    # find active main dimensions (parent is null)
    active_main_dims = list(
        FlavorCharacteristic.objects.filter(is_active=True, parent__isnull=True)
        .values_list("id", flat=True)
    )

    taste_profile = get_or_create_profile_with_defaults(review.user)

    # Update each main taste dimension that is present in the product that is being reviewed 

    # get the main taste dimenions of the product 
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
    
    if not product_tastes:
        logger.error(
            "Taste profile update skipped: product has no flavor dimensions",
            extra={
                "product_id": review.product_id,
                "review_id": review.id,
                "user_id": review.user_id,
            },
        )
        return taste_profile
    
    # for each taste dimension, get the total count of products that the user has rated
    dimension_ids = [taste_dimension_id for taste_dimension_id, _intensity in product_tastes]
    dimension_rating_counts = dict(
        Review.objects.filter(
            user=review.user,
            product__product_tastes__taste_dimension_id__in=dimension_ids,
        )
        .values_list("product__product_tastes__taste_dimension_id")
        .annotate(total=Count("product", distinct=True))
        .values_list("product__product_tastes__taste_dimension_id", "total")
    )
    current_user_dimension_ratings = dict(
        TasteProfileFlavorDimension.objects.filter(taste_profile=taste_profile, characteristic_id__in=active_main_dims)
        .values_list("characteristic_id", "value")
    )

    # for each taste dimension in product tastes, calculate and set the user's new average 
    # based on their current rating and the new ranking of the product
    for taste_dimension_id, _intensity in product_tastes:
        # set count of rated products to 1 since we have a default score of 50 for the main taste dimensions
        total_rated_products_for_dimension = dimension_rating_counts.get(taste_dimension_id, 1) 
        # get the user's current taste profile score for that dimension 
        old_average = current_user_dimension_ratings[taste_dimension_id]
        new_average_num = (old_average * total_rated_products_for_dimension) + review.user_rating 
        new_average_denom = total_rated_products_for_dimension + 1
        new_average = new_average_num / new_average_denom

        # update the taste profile dimension with the new_average
        TasteProfileFlavorDimension.objects.filter(taste_profile=taste_profile, characteristic=taste_dimension_id).update(value=new_average)

    return taste_profile


