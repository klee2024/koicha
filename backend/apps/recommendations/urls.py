from django.urls import path
from .views import GetAllRecommendedProducts

urlpatterns = [
    path("", GetAllRecommendedProducts.as_view(), name="recommendations"),
]