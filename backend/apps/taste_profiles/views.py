from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from .models import TasteProfile
from .serializers import TasteProfileSerializer

# Create your views here.

class GetUserTasteProfile(APIView):
    """
    GET api/taste-profile/me
    Gets the requesting user's taste profile
    """
    permission_classes=[IsAuthenticated]

    def get(self, request):

        user = request.user
        user_taste_profile = TasteProfile.object.filter(user=user)
        serializer = TasteProfileSerializer(user_taste_profile)
        return Response(serializer.data)

