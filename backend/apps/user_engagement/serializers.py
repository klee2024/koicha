
from rest_framework import serializers
from apps.products.models import Product
from apps.products.serializers import ProductSerializer
from apps.user_engagement.models import UserBookmark


class UserBookmarkSerializer(serializers.ModelSerializer): 
    product = ProductSerializer()
    class Meta: 
          model = UserBookmark
          fields = ["id", 
                    "product", 
                    "bookmarked_at"]

class UserBookmarkToggleSerializer(serializers.ModelSerializer):
    product = serializers.PrimaryKeyRelatedField(queryset=Product.objects.all())
    class Meta:
        model = UserBookmark
        fields = ["product"]