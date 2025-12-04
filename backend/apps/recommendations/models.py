
from django.conf import settings
from django.db import models
from apps.products.models import Product


class UserProductMatch(models.Model):
    user = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        related_name="product_matches", # get all of the rec scores for a user of all products
    )
    product = models.ForeignKey(
        Product,
        on_delete=models.CASCADE,
        related_name="user_matches", # get all of the rec scores for a product of all users
    )

    match_percentage = models.DecimalField(
        max_digits=5,   # 100.00 max
        decimal_places=2,
    )
    computed_at = models.DateTimeField(auto_now=True)

    class Meta:
        # one row per (user, product)
        constraints = [
            models.UniqueConstraint(
                fields=["user", "product"],
                name="unique_user_product_match",
            )
        ]
        ordering = ["-match_percentage"] # matches are returned in descending order based on match percentage

    def __str__(self):
        return f"{self.user} ↔ {self.product} = {self.match_percentage}%"
