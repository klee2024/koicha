from apps.taste_profiles.models import TasteProfile
from apps.taste_profiles.models import TasteProfileFlavorDimension

from apps.taste_profiles.models import TasteProfile, TasteProfileFlavorDimension, FlavorCharacteristic

def get_or_create_profile_with_defaults(user, active_main_dims):
    # find active main dimensions (parent is null)
    active_main_dims = list(
        FlavorCharacteristic.objects.filter(is_active=True, parent__isnull=True)
        .values_list("id", flat=True)
    )

    taste_profile, _created = TasteProfile.objects.get_or_create(
        user=user,
        defaults={"is_system": False},
    )
    # ensure TasteProfileFlavorDimension rows exist for all active mains
    existing_dim_ids = set(
        TasteProfileFlavorDimension.objects.filter(
            taste_profile=taste_profile,
            characteristic_id__in=active_main_dims,
        ).values_list("characteristic_id", flat=True)
    )
    missing = [
        characteristic
        for characteristic in active_main_dims
        if characteristic not in existing_dim_ids
    ]
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
    return taste_profile
