from rest_framework import serializers
from .models import Preparation, Tag, Product, UserBookmark

class TagSerializer(serializers.ModelSerializer):
    class Meta: 
        model = Tag
        fields = ["slug", 
                "name"]
            
class PreparationSerializer(serializers.ModelSerializer):
    class Meta: 
        model = Preparation
        fields = ["slug", 
                "name"]
            
class ProductSerializer(serializers.ModelSerializer):
    preparation = PreparationSerializer()
    tags = TagSerializer(many=True)
    class Meta: 
        model = Product
        fields = ["name", 
                    "brand", 
                    "preparation", 
                    "image_url", 
                    "product_url", 
                    "tags"]

class UserBookmarkSerializer(serializers.ModelSerializer): 
    user = serializers.PrimaryKeyRelatedField(read_only=True)
    product = ProductSerializer()
    class Meta: 
          fields = ["user", 
                    "product", 
                    "bookmarked_at"]

class UserBookmarkToggleSerializer(serializers.ModelSerializer):
    product = serializers.PrimaryKeyRelatedField(queryset=Product.objects.all())
    class Meta:
        model = UserBookmark
        fields = ["product"]

