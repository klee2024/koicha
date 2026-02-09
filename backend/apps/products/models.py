from django.conf import settings
from django.db import models

from ..taste_profiles.models import FlavorCharacteristic
from django.core.validators import MinValueValidator, MaxValueValidator


# Consider moving this to an entity called filters with another field for type
class Preparation(models.Model):
    slug = models.SlugField(unique=True)
    name = models.CharField(max_length=100, unique=True)

    def __str__(self):
        return self.name


class Tag(models.Model):
    slug = models.SlugField(unique=True)
    name = models.CharField(max_length=100, unique=True)

    def __str__(self):
        return self.name



class Product(models.Model):
    name = models.CharField(max_length=255)
    brand = models.CharField(max_length=255, blank=True)
    preparation = models.ForeignKey(
        Preparation,
        on_delete=models.PROTECT,
         # creates a relationship products on the Preparation model that allows all products associated with a prep to be retrieved
        related_name="products",
    )
    image_url = models.URLField(blank=True)
    product_url = models.URLField(blank=True)

    tags = models.ManyToManyField(
        Tag,
        related_name="products",
        blank=True,
    )

    taste_dimensions = models.ManyToManyField(
        FlavorCharacteristic,
        through="ProductTaste",
        related_name="products",
        blank=True,
    )

    def __str__(self):
        return f"{self.name} ({self.brand})"

    
# model to join taste profile value to a particular product 
# i.e. this product is 70% nutty and 30% creamy 
class ProductTaste(models.Model):
    product = models.ForeignKey(
        Product,
        on_delete=models.CASCADE,
        related_name="product_tastes",
    )
    taste_characteristic = models.ForeignKey(
        FlavorCharacteristic,
        on_delete=models.CASCADE,
        related_name="product_tastes",
    )
    intensity = models.PositiveSmallIntegerField(
        default=100,  # MVP default for “tag present”
        validators=[MinValueValidator(0), MaxValueValidator(100)],
    )

    class Meta:
        constraints = [
            models.UniqueConstraint(
                fields=["product", "taste_characteristic"],
                name="uniq_product_taste_characteristic",
            )
        ]
        indexes = [
            models.Index(fields=["taste_characteristic"]),
            models.Index(fields=["product"]),
        ]

    def __str__(self):
        return f"{self.product} · {self.taste_characteristic} = {self.intensity}"

