from django.conf import settings
from django.db import models

from apps.products.models import Product

# Create your models here.
class UserBookmark(models.Model): 
    user = models.ForeignKey(
        settings.AUTH_USER_MODEL, 
        on_delete=models.CASCADE, 
        related_name="bookmarks"
    )
    product= models.ForeignKey(
        Product, 
        on_delete=models.CASCADE, 
        related_name="bookmarks"
    )
    bookmarked_at= models.DateTimeField(auto_now_add=True)

    class Meta:
        constraints = [
            models.UniqueConstraint(
                fields=["user", "product"],
                name="unique_user_bookmark",
            )
        ]
    def __str__(self):
        return f"{self.user.username} bookmarked {self.product.name}"