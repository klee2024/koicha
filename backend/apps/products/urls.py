from django.urls import path
from .views import GetAllPreparations, GetAllTags, GetAllProducts

urlpatterns = [
    path("preparations/", GetAllPreparations.as_view(), name="preparations"),
    path("tags/", GetAllTags.as_view(), name="tags"),
    path("products/", GetAllProducts.as_view(), name="products"),
    path("products/<slug:product_id>/bookmark", GetAllProducts.as_view(), name="bookmarks")
]