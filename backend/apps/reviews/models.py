from django.db import models

from django.conf import settings
from apps.products.models import Product

# Create your models here.

class ReviewPreference(models.Model):
    bucket = models.SlugField(unique=True) # "LIKED", "DISLIKED", etc. 
    label = models.CharField(max_length=100) # "I liked it", "It was okay", etc.
    value = models.IntegerField() # order buckets in UI 

    def __str__(self):
        return self.label

class ReviewSubPreference(models.Model):
    """
    Specific option inside a bucket, ex: 
    - bucket: LIKED       -> "I love it", "I really like it"
    - bucket: DISLIKED    -> "I really dislike it", "I slightly dislike it"
    """
    bucket = models.ForeignKey(
        ReviewPreference, 
        on_delete=models.CASCADE, 
        related_name="subpreferences"
    )
    label = models.CharField(max_length=100)
    value = models.IntegerField()
    def __str__(self):
        return f"{self.preference.label} – {self.label}"


class Review(models.Model): 
    user = models.ForeignKey(
    settings.AUTH_USER_MODEL,
    on_delete=models.CASCADE,
    related_name="reviews", # get all of the reviews related to the user
    )
    product = models.ForeignKey(
    Product,
    on_delete=models.CASCADE,
    related_name="reviews", # get all of the reviews for a product
    )
    user_rating = models.DecimalField(max_digits = 5, decimal_places=2)
    user_review_text = models.TextField()
    preference_level = models.ForeignKey(
        ReviewSubPreference, 
        on_delete=models.PROTECT, 
        related_name="reviews_subpreferences"
    ) # from review_subpreferences, gets all reviews associated with that subpreference

    class Meta:
        constraints = [
            models.UniqueConstraint(
                fields=["user", "product"],
                name="unique_user_product_review",
            )
        ]

    def __str__(self):
        return f"Review by {self.user} on {self.product}"