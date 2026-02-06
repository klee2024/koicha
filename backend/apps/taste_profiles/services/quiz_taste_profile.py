from collections import Counter

from django.db import transaction

from apps.quiz.models import QuizOption
from apps.taste_profiles.models import TasteProfileFlavorDimension, FlavorCharacteristic
from .utils import get_or_create_profile_with_defaults


# transforms the quiz answers to initially seed the user's taste profile

@transaction.atomic
def apply_quiz_to_taste_profile(session, quiz_answers):
    if hasattr(quiz_answers, "select_related"):
        quiz_answers = list(quiz_answers.select_related("option", "question"))
    else:
        quiz_answers = list(quiz_answers)

    active_main_dims = FlavorCharacteristic.objects.filter(
        is_active=True, parent__isnull=True
    )
    active_main_dim_ids = list(active_main_dims.values_list("id", flat=True))
    active_main_dim_slugs = set(active_main_dims.values_list("slug", flat=True))

    taste_profile = get_or_create_profile_with_defaults(
        session.user, active_main_dim_ids
    )

    selected_counts = Counter(
        answer.option.value
        for answer in quiz_answers
        if answer.option.value in active_main_dim_slugs
    )

    question_ids = {answer.question_id for answer in quiz_answers}
    total_counts = Counter(
        QuizOption.objects.filter(
            question_id__in=question_ids, value__in=active_main_dim_slugs
        ).values_list("value", flat=True)
    )

    profile_dims = (
        TasteProfileFlavorDimension.objects.filter(
            taste_profile=taste_profile, characteristic_id__in=active_main_dim_ids
        )
        .select_related("characteristic")
    )

    updated_dims = []
    for dim in profile_dims:
        slug = dim.characteristic.slug
        total = total_counts.get(slug, 0)
        if not total:
            continue
        selected = selected_counts.get(slug, 0)
        observed_score = 100 * selected / total
        weight = total / (total + 2)
        blended_score = (50 * (1 - weight)) + (observed_score * weight)
        dim.value = max(0, min(100, round(blended_score)))
        updated_dims.append(dim)

    if updated_dims:
        TasteProfileFlavorDimension.objects.bulk_update(updated_dims, ["value"])

    return taste_profile




