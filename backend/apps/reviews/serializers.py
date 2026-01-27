from ..taste_profiles.services.update_taste_profile import apply_review_to_taste_profile
import logging
from rest_framework import serializers
from .models import ReviewPreference, ReviewSubPreference, Review
from ..products.serializers import ProductSerializer
from ..products.models import Product

logger = logging.getLogger(__name__)



class ReviewSubPreferenceSerializer(serializers.ModelSerializer): 
    class Meta:
        model = ReviewSubPreference
        fields = ["id", 
                  "label", 
                  "value"]
        
class ReviewPreferenceSerializer(serializers.ModelSerializer): 
    subpreferences = ReviewSubPreferenceSerializer(many=True, read_only=True)

    class Meta:
        model = ReviewPreference
        fields = ["id", 
                  "bucket",
                  "label", 
                  "value",
                  "subpreferences"]
        
class ReviewSerializer(serializers.ModelSerializer):
    product = ProductSerializer()
    preference_level = ReviewSubPreferenceSerializer()
    user = serializers.PrimaryKeyRelatedField(read_only=True)

    class Meta: 
        model = Review
        fields = ["id", 
                  "user", 
                  "product", 
                  "user_rating", 
                  "user_review_text", 
                  "preference_level", 
                  ]
        
class CreateReviewSerializer(serializers.ModelSerializer):
    product = serializers.PrimaryKeyRelatedField(
        queryset=Product.objects.all()
    )

    preference_level = serializers.PrimaryKeyRelatedField(
        queryset=ReviewSubPreference.objects.all()
    )

    user_review_text = serializers.CharField(
        required=False,
        allow_blank=True,
    )

    class Meta: 
        model = Review
        fields = ["id", 
                  "product", 
                  "user_rating", 
                  "user_review_text", 
                  "preference_level"]
        
    def create(self, validated_data):
        request = self.context["request"]
        review = Review.objects.create(user=request.user, **validated_data)
        try: 
            apply_review_to_taste_profile(review)
        except: 
            logger.exception(
                "Failed to update taste profile after review creation",
                extra={"review_id": review.id, "user_id": request.user.id, "product_id": review.product_id},
            )
        return review