from django.contrib import admin
from django.urls import include, path
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)

from apps.users.views import UserTokenObtainPairView

urlpatterns = [
    path('admin/', admin.site.urls),
    # auth
    path("api/auth/", include("apps.users.urls")),  # /api/auth/signup/
    path("api/auth/token/", UserTokenObtainPairView.as_view(), name="token_obtain_pair"),
    path("api/auth/token/refresh/", TokenRefreshView.as_view(), name="token_refresh"),

    path("api/quiz/", include("apps.quiz.urls")),
    path("api/products/", include("apps.products.urls")),
    path("api/reviews/", include("apps.reviews.urls")),
    path("api/recommendations/", include("apps.recommendations.urls")),
    path("api/taste_profiles/", include("apps.taste_profiles.urls")),
    path("api/user_engagement/", include("apps.user_engagement.urls")),
]
