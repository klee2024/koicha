from django.db import models

from django.conf import settings
from django.core.validators import MinValueValidator, MaxValueValidator
from django.db.models import Q


class TasteProfile(models.Model): 
    user = models.OneToOneField(
        settings.AUTH_USER_MODEL, 
        on_delete=models.CASCADE, 
        related_name="taste_profile",
        null=True, 
        blank=True
    )
    # TODO: update naming for clarity
    flavor_characteristics = models.ManyToManyField(
        "FlavorCharacteristic",
        through="TasteProfileFlavorDimension",
        through_fields=("taste_profile", "characteristic"),
        related_name="taste_profiles",
        blank=True,
    )
    # used for default taste profile
    is_system = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        constraints = [
            models.CheckConstraint(
                condition=(Q(is_system=True) & Q(user__isnull=True)) |
                        (Q(is_system=False) & Q(user__isnull=False)),
                name="tasteprofile_user_or_system",
            ),
        ]

    def __str__(self): 
        return f"Taste profile for {self.user}"
    
    
class TasteProfileArchetype(models.Model): 
    slug = models.SlugField(unique=True)
    name = models.CharField(max_length=100)
    description = models.TextField(blank=True)

    def __str__(self): 
        return f"Taste profile archetype: {self.name}" 
    
class TasteProfileDetail(models.Model):
    class DimensionType(models.TextChoices):
        FLAVOR = "flavor", "Flavor"
        FREQUENCY = "frequency", "Frequency"
    
    taste_profile = models.ForeignKey(
        TasteProfile, 
        on_delete=models.CASCADE, 
        related_name="details"
    )
    dimension = models.CharField(
        max_length=20, 
        choices=DimensionType.choices, 
        default=DimensionType.FLAVOR
    )
    archetype = models.ForeignKey(
        TasteProfileArchetype, 
        on_delete=models.PROTECT,
        related_name="taste_profile_details"
    )
    archetype_match = models.PositiveSmallIntegerField(
        default=0, 
        validators=[MinValueValidator(0), MaxValueValidator(100)],
    )
    detail_description = models.TextField(blank=True) # description generated for the specific user

    def __str__(self): 
        return f"detail for dimension {self.dimension} for taste profile {self.taste_profile.id}, match: {self.archetype_match}" 

class FlavorCharacteristic(models.Model):
    slug = models.SlugField(unique=True)
    name = models.CharField(max_length=100, unique=True)
    parent = models.ForeignKey(
        "self",
        null=True,
        blank=True,
        related_name="sub_characteristics",
        on_delete=models.PROTECT,
    )
    is_active = models.BooleanField(default=True)

    class Meta:
        indexes = [
            models.Index(fields=["parent"]),
            models.Index(fields=["is_active", "parent"]),
        ]

    def __str__(self):
        return self.name if not self.parent else f"{self.parent.name} → {self.name}"


class TasteProfileFlavorDimension(models.Model): 
    taste_profile = models.ForeignKey(
        TasteProfile, 
        on_delete=models.CASCADE, 
        related_name="flavor_dimensions"
    )
    characteristic=models.ForeignKey(
        FlavorCharacteristic, 
        on_delete=models.CASCADE,
        related_name="taste_profile_dimensions"
    ) 
    
    # score 0..100
    value = models.PositiveSmallIntegerField(
        default=50,
        validators=[MinValueValidator(0), MaxValueValidator(100)],
    )

    # how much evidence supports this dimension
    confidence = models.FloatField(default=0.0)


    class Meta:
        constraints = [
            models.UniqueConstraint(
                fields=["taste_profile", "characteristic"],
                name="unique_profile_characteristic_value",
            )
        ]
        indexes = [
            models.Index(fields=["taste_profile"]),
            models.Index(fields=["characteristic"]),
        ]

    def __str__(self):
        return f"{self.taste_profile} – {self.characteristic.slug} = {self.value}"
