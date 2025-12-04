from django.db import models

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

    def __str__(self):
        return f"{self.name} ({self.brand})"
