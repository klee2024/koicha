from django.shortcuts import render
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.views import APIView

from apps.user_engagement.models import UserBookmark
from apps.user_engagement.serializers import UserBookmarkToggleSerializer, UserBookmarkSerializer
from rest_framework.response import Response
from rest_framework import status

# Create your views here.
class ToggleBookmark(APIView):
    """
    GET /api/user-engagement/products/<product_id>/bookmark/
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
        
class GetAllBookmarks(APIView): 
    """
    GET /api/user-engagement/products/bookmarks/me
    Gets all of the requested user's bookmarks
    """

    permission_classes = [IsAuthenticated]

    def get(self, request):
        user_bookmarks = (UserBookmark.objects.filter(user=request.user)
                          .order_by("-bookmarked_at"))
        serializer = UserBookmarkSerializer(user_bookmarks, many=True)
        
        return Response(serializer.data)

