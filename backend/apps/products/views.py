from django.shortcuts import render

from django.shortcuts import render
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework import status
from rest_framework.permissions import IsAuthenticated, AllowAny

from .serializers import PreparationSerializer, ProductSerializer, TagSerializer, UserBookmarkToggleSerializer 

from .models import Tag, Preparation, Product, UserBookmark

class GetAllTags(APIView):
    """
    GET /api/products/tags/
    Gets all of the tags associated with products
    """

    permission_classes = [AllowAny]

    def get(self, request):
        tags = (
            Tag.objects.all()
        )
    
        serializer = TagSerializer(tags, many=True)
        return Response(serializer.data)

class GetAllPreparations(APIView):
    """
    GET /api/products/preparations/
    Gets all of the preparations associated with products
    """

    permission_classes = [AllowAny]

    def get(self, request):
        preparations = (
            Preparation.objects.all()
        )
    
        serializer = PreparationSerializer(preparations, many=True)
        return Response(serializer.data)

class GetAllProducts(APIView):
    """
    GET /api/products/preparations/
    Gets all of the preparations associated with products
    """

    permission_classes = [AllowAny]

    def get(self, request): 
        products = (
            Product.objects.all()
        )
        serializer = ProductSerializer(products, many=True)
        return Response(serializer.data)
    
class ToggleBookmark():
    """
    GET /api/products/<product_id>/bookmark
    Toggles a user's bookmark of the product
    """

    permission_classes = [IsAuthenticated]

    def put(self, request, *args, **kwargs):
        serializer = UserBookmarkToggleSerializer(data=request.data, context={"request": request})
        serializer.is_valid(raise_exception=True)

        product = serializer.validated_data["product"]
        user = request.user

        existing = UserBookmark.objects.filter(user=user, product=product).first()

        if existing:
            existing.delete()
            return Response({"bookmarked": False}, status=status.HTTP_200_OK)
        else:
            UserBookmark.objects.create(user=user, product=product)
            return Response({"bookmarked": True}, status=status.HTTP_201_CREATED)