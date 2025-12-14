from django.shortcuts import render
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework import status, generics
from rest_framework.permissions import IsAuthenticated, AllowAny  # or AllowAny for public quizzes
from .models import Review, ReviewSubPreference, ReviewPreference
from .serializers import ReviewSubPreferenceSerializer, ReviewPreferenceSerializer, CreateReviewSerializer, ReviewSerializer

class GetReviewPreferenceBuckets(APIView): 
    """
    GET /api/reviews/review-preferences/
    Returns all of the review preference buckets
    """

    permission_classes = [AllowAny]

    def get(self, request):
        review_preferences = (
            ReviewPreference.objects.all()
            .order_by('value') # order by value from lowest to highest
        )

        serializer = ReviewPreferenceSerializer(review_preferences, many=True)
        return Response(serializer.data)
    
class CreateReview(generics.CreateAPIView): 
    """
    POST /api/reviews/
    Creates a review for the requesting user
    """

    serializer_class = CreateReviewSerializer
    queryset = Review.objects.all()
        


class GetUserReviews(APIView): 
    """
    GET /api/user
    Gets all of the user's reviews
    """

    permission_classes = [IsAuthenticated]

    def get(self, request):
        reviews = (
            Review.objects.filter(user=request.user)
            .order_by('-user_rating')
        )
        serializer = ReviewSerializer(reviews, many=True)
        return Response(serializer.data)

class GetUserReviewsByPreference(APIView):
    """
    POST /api/reviews/user/preference/<preferenceId>
    Gets all of the user's reviews within a review preference bucket
    """

    # get all of the user's reviews
    # returns the reviews that match the preference by 
    # geting the bucket that is on the subpreference level 

    # def get(self, request, preferenceId):
    #     serializer = ReviewSerializer(user_reviews_for_preference, many=True)
