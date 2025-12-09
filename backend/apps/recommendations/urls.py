from django.urls import path
from .views import GetAllPreparations, GetAllTags, GetAllProducts

urlpatterns = [
    path("", GetAllPreparations.as_view(), name="recommendations"),
]