from django.urls import path
from .views import RegisterView, MeView

urlpatterns = [
    path("signup/", RegisterView.as_view(), name="auth-signup"),
    path("auth/me/", MeView.as_view(), name="auth-me")
]
