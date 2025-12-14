from django.urls import path
from .views import CreateReview, GetReviewPreferenceBuckets, GetUserReviews

urlpatterns = [
    path("review-preferences/", 
         GetReviewPreferenceBuckets.as_view(), 
         name="review-preference-buckets"), 
    path("me/", 
         GetUserReviews.as_view(), 
         name="user-reviews"), 
    path("", CreateReview.as_view(), name="create-review")
]

