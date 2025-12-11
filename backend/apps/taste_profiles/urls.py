from django.urls import path
from .views import GetUserTasteProfile

urlpatterns = [
    path("me", GetUserTasteProfile.as_view(), name="user-taste-profile"),
]