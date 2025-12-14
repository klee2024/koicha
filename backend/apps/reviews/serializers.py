from rest_framework import serializers
from .models import ReviewPreference, ReviewSubPreference, Review
from ..products.serializers import ProductSerializer
from ..products.models import Product


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
        return Review.objects.create(user=request.user, **validated_data)