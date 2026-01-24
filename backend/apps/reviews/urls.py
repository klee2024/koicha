from django.urls import path
from .views import CreateReview, GetReviewPreferenceBuckets, GetUserReviews, GetUserReviewsByPreference

urlpatterns = [
    path("review-preferences/", 
         GetReviewPreferenceBuckets.as_view(), 
         name="review-preference-buckets"), 
    path("me/", 
         GetUserReviews.as_view(), 
         name="user-reviews"), 
    path("me/preference-bucket/<int:preference_id>/", 
         GetUserReviews.as_view(), 
         name="user-reviews-by-preference"), 
    path("", CreateReview.as_view(), name="create-review")
]

