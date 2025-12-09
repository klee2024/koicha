from rest_framework import serializers
from apps.products.models import Product
from ..products.serializers import TagSerializer, PreparationSerializer

class ProductRecommendationSerializer(serializers.ModelSerializer):
    match_score = serializers.DecimalField(
        max_digits = 5,
        decimal_places = 2,
        required = False, 
        allow_null = True
    )
    preparation = PreparationSerializer()
    tags = TagSerializer(many=True)
    class Meta: 
        model = Product
        fields = ["id", 
                  "name", 
                  "brand", 
                  "preparation", 
                  "image_url", 
                  "product_url", 
                  "tags", 
                  "match_score"]