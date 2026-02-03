from decimal import Decimal

from django.test import TestCase

from apps.products.models import Preparation, Product, ProductTaste
from apps.reviews.models import Review, ReviewPreference, ReviewSubPreference
from apps.taste_profiles.models import FlavorCharacteristic, TasteProfile, TasteProfileFlavorDimension
from apps.taste_profiles.services.update_taste_profile import apply_review_to_taste_profile
from apps.users.models import User


class ApplyReviewToTasteProfileTests(TestCase):
    def setUp(self):
        self.user = User.objects.create_user(username="tester", password="pw")
        self.preference = ReviewPreference.objects.create(
            bucket="LIKED",
            label="I liked it",
            value=Decimal("1.00"),
        )
        self.subpreference = ReviewSubPreference.objects.create(
            bucket=self.preference,
            label="I really like it",
            value=Decimal("1.00"),
        )
        self.preparation = Preparation.objects.create(slug="drip", name="Drip")
        self.dimension = FlavorCharacteristic.objects.create(
            slug="floral",
            name="Floral",
            is_active=True,
            parent=None,
        )

    def _create_product_with_taste(self, name):
        product = Product.objects.create(name=name, brand="Brand", preparation=self.preparation)
        ProductTaste.objects.create(product=product, taste_dimension=self.dimension, intensity=100)
        return product

    def test_first_review_averages_with_default_dimension_value(self):
        product = self._create_product_with_taste("Tea One")
        review = Review.objects.create(
            user=self.user,
            product=product,
            user_rating=Decimal("80.00"),
            user_review_text="Nice",
            preference_level=self.subpreference,
        )

        apply_review_to_taste_profile(review)

        dim = TasteProfileFlavorDimension.objects.get(
            taste_profile__user=self.user,
            characteristic=self.dimension,
        )
        self.assertEqual(dim.value, 65)

    def test_second_review_averages_with_existing_dimension_value(self):
        product_one = self._create_product_with_taste("Tea One")
        product_two = self._create_product_with_taste("Tea Two")
        first_review = Review.objects.create(
            user=self.user,
            product=product_one,
            user_rating=Decimal("80.00"),
            user_review_text="Nice",
            preference_level=self.subpreference,
        )
        apply_review_to_taste_profile(first_review)

        second_review = Review.objects.create(
            user=self.user,
            product=product_two,
            user_rating=Decimal("95.00"),
            user_review_text="Great",
            preference_level=self.subpreference,
        )
        apply_review_to_taste_profile(second_review)

        dim = TasteProfileFlavorDimension.objects.get(
            taste_profile__user=self.user,
            characteristic=self.dimension,
        )
        self.assertEqual(dim.value, 75)

    def test_creates_default_taste_profile_when_missing(self):
        user = User.objects.create_user(username="newbie", password="pw")
        self.assertFalse(TasteProfile.objects.filter(user=user).exists())

        FlavorCharacteristic.objects.create(
            slug="nutty",
            name="Nutty",
            is_active=True,
            parent=None,
        )

        product = Product.objects.create(name="Plain Tea", brand="Brand", preparation=self.preparation)
        review = Review.objects.create(
            user=user,
            product=product,
            user_rating=Decimal("70.00"),
            user_review_text="Fine",
            preference_level=self.subpreference,
        )

        apply_review_to_taste_profile(review)

        taste_profile = TasteProfile.objects.get(user=user)
        active_main_dims = FlavorCharacteristic.objects.filter(is_active=True, parent__isnull=True)
        expected_count = active_main_dims.count()
        dim_ids = set(
            TasteProfileFlavorDimension.objects.filter(taste_profile=taste_profile)
            .values_list("characteristic_id", flat=True)
        )
        self.assertEqual(dim_ids, set(active_main_dims.values_list("id", flat=True)))
        self.assertEqual(
            TasteProfileFlavorDimension.objects.filter(taste_profile=taste_profile).count(),
            expected_count,
        )
        self.assertEqual(
            TasteProfileFlavorDimension.objects.filter(
                taste_profile=taste_profile,
                value=50,
            ).count(),
            expected_count,
        )
