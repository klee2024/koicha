from __future__ import annotations
from typing import Dict, List

def geometric_tag_intensities(
    ordered_slugs: List[str],
    base: float = 0.6,
    total: int = 100,
) -> Dict[str, int]:
    """
    Convert an ordered list of slugs into integer intensities that sum to `total`,
    using geometric decay: raw_i = base^i.

    Example: ["umami","grassy","nutty"], base=0.6 -> {umami:51, grassy:31, nutty:18}
    """
    if not ordered_slugs:
        return {}

    if not (0 < base < 1):
        raise ValueError("base must be between 0 and 1 (exclusive).")

    # calculate raw weights 
    raw = [base ** i for i in range(len(ordered_slugs))]
    raw_sum = sum(raw)
    scaled = [(w / raw_sum) * total for w in raw]  # scale the weights based on the total sum

    # largest remainder method to ensure ints sum exactly to total
    rounded_weights = [int(x) for x in scaled]
    remainder = total - sum(rounded_weights) # get the amount that was lost by rounding 
    weight_diffs = [(i, scaled[i] - rounded_weights[i]) for i in range(len(scaled))] # get how much was lost by each weight when we rounded 
    weight_diffs.sort(key=lambda t: t[1], reverse=True) # sort by whichever weight lost the most  

    # for the remainder that we need to allocate to equal the total
    # add 1 point (effectively rounding up) the weights that lost the most 
    for i in range(remainder):
        rounded_weights[weight_diffs[i][0]] += 1

    return {slug: rounded_weights[idx] for idx, slug in enumerate(ordered_slugs)}
