from django.urls import path
from .views import GetUserTasteProfile, GetDefaultTasteProfile

urlpatterns = [
    path("me", GetUserTasteProfile.as_view(), name="user-taste-profile"),
    path("default", GetDefaultTasteProfile.as_view(), name="default-taste-profile"),
]