from __future__ import annotations
from typing import Dict, List

from apps.taste_profiles.models import FlavorCharacteristic

def calculate_tag_intensities(
    tags: List[str],
) -> Dict[str, int]:
    """
    Convert a list of tags list of slugs into integer intensities 
    Initial algorithm will set the intensity to 100 if the tag is present in the active main taste profile
    characteristics

    Example: ["umami","grassy","nutty"], base=0.6 -> {umami:100, grassy:100, nutty:100}
    Example: ["umami","sweet"], base=0.6 -> {umami:100} Note: sweet is excluded because it is not an active main taste profile characteristic
    """

    # get a list of all the slugs of the main flavor characteristics
    main_flavor_dimensions = FlavorCharacteristic.objects.filter(is_active=True, parent__isnull=True).values_list('slug', flat=True)
    
    # create a dictionary where the tag is set to 100 if the tag is present in the main flavor dimensions
    tag_intensities = {tag: 100 for tag in tags if tag in main_flavor_dimensions}

    return tag_intensities