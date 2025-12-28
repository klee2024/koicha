from django.db import models

from django.conf import settings

class TasteProfile(models.Model): 
    user = models.OneToOneField(
        settings.AUTH_USER_MODEL, 
        on_delete=models.CASCADE, 
        related_name="taste_profile",
        null=True, 
        blank=True
    )
    flavor_characteristics = models.ManyToManyField(
        "FlavorCharacteristic",
        through="TasteProfileFlavorValue",
        related_name="taste_profiles",
        blank=True,
    )
    is_system = models.BooleanField(default=False)

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
    archetype_match = models.DecimalField(max_digits = 5, decimal_places=2)
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
    active = models.BooleanField(default=True)

    class Meta:
        # parent is null => main; parent not null => sub
        indexes = [models.Index(fields=["parent"])]

    def __str__(self):
        return f"{self.name} ({self.parent})"

class TasteProfileFlavorValue(models.Model): 
    taste_profile = models.ForeignKey(
        TasteProfile, 
        on_delete=models.CASCADE, 
        related_name="flavor_values"
    )
    characteristic=models.ForeignKey(
        FlavorCharacteristic, 
        on_delete=models.CASCADE,
        related_name="profile_values"
    ) 
    value=models.DecimalField(max_digits=5, decimal_places=2)

    class Meta:
        constraints = [
            models.UniqueConstraint(
                fields=["taste_profile", "characteristic"],
                name="unique_profile_characteristic_value",
            )
        ]
    def __str__(self):
        return f"{self.taste_profile} – {self.flavor_characteristic} = {self.value}"
