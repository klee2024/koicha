from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated, AllowAny
from .models import TasteProfile
from .serializers import TasteProfileSerializer
from rest_framework.exceptions import NotFound


# Create your views here.

class GetUserTasteProfile(APIView):
    """
    GET api/taste-profile/me
    Gets the requesting user's taste profile
    """
    permission_classes=[IsAuthenticated]

    def get(self, request):
        # TODO: creating the taste profile should create with default values
        # for the main characteristics
        try: 
            user_taste_profile = TasteProfile.objects.get(
                user=request.user
            )
        except TasteProfile.DoesNotExist:
            raise NotFound("Taste profile not found for this user.")
        serializer = TasteProfileSerializer(user_taste_profile)
        return Response(serializer.data)

class GetDefaultTasteProfile(APIView): 
    """
    GET api/taste-profile/default
    Gets a default taste profile for non-logged in users for frontend rendering
    """
    permission_class =[AllowAny]

    def get(self, request):
        default_taste_profile = TasteProfile.objects.get(is_system=True)
        serializer = TasteProfileSerializer(default_taste_profile)
        return Response(serializer.data)