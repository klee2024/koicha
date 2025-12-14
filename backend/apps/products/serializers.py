from rest_framework import serializers
from .models import Preparation, Tag, Product

class TagSerializer(serializers.ModelSerializer):
    class Meta: 
        model = Tag
        fields = ["id", 
                  "slug", 
                  "name"]
            
class PreparationSerializer(serializers.ModelSerializer):
    class Meta: 
        model = Preparation
        fields = ["id",
                  "slug",
                  "name"]
            
class ProductSerializer(serializers.ModelSerializer):
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
                    "tags"]


