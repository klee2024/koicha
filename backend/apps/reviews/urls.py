from django.urls import path
from .views import GetReviewPreferenceBuckets

urlpatterns = [
    path("review-preferences/", 
         GetReviewPreferenceBuckets.as_view(), 
         name="review-preference-buckets"), 
]

