from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated

from .querysets import products_with_match_for_user
from .serializers import ProductRecommendationSerializer

class GetAllRecommendedProducts(APIView):
    """
    GET /api/recommendations/
    Gets all products with the user's recommendation match score (if cached in the user product match table)
    """
    permission_classes=[IsAuthenticated]
    def get(self, request):
        queryset = products_with_match_for_user(request.user);
        serializer = ProductRecommendationSerializer(queryset, many=True)
        return Response(serializer.data)
