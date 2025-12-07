from django.shortcuts import render

from django.shortcuts import render
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework import status
from rest_framework.permissions import IsAuthenticated, AllowAny

from .serializers import PreparationSerializer, ProductSerializer, TagSerializer 

from .models import Tag, Preparation, Product

class GetAllTags(APIView):
    """
    GET /api/product/tags/
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
    GET /api/product/preparations/
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
    GET /api/product/preparations/
    Gets all of the preparations associated with products
    """

    permission_classes = [AllowAny]

    def get(self, request): 
        products = (
            Product.objects.all()
        )
        serializer = ProductSerializer(products, many=True)
        return Response(serializer.data)