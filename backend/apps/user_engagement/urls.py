from django.urls import path
from .views import ToggleBookmark, GetAllBookmarks

urlpatterns = [
    path("products/<int:product_id>/bookmark/", ToggleBookmark.as_view(), name="toggle-bookmark"),
    path("products/bookmarks/me/", GetAllBookmarks.as_view(), name="bookmarks")

]