from django.db import models

from django.conf import settings

class TasteProfile(models.Model): 
    user = models.OneToOneField(
        settings.AUTH_USER_MODEL, 
        on_delete=models.CASCADE, 
        related_name="taste_profile"
    )
    flavor_characteristics = models.ManyToManyField(
        "FlavorCharacteristic",
        through="TasteProfileFlavorCharacteristic",
        related_name="taste_profiles",
        blank=True,
    )

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
    class CharacteristicType(models.TextChoices):
        MAIN = "main", "Main"
        SUB = "sub", "Sub"

    slug = models.SlugField(unique=True)
    name = models.CharField(max_length=100, unique=True)
    hierarchy = models.CharField(
        max_length=10,
        choices=CharacteristicType.choices,
        default=CharacteristicType.MAIN,
    )

    def __str__(self):
        return f"{self.name} ({self.hierarchy})"

class TasteProfileFlavorCharacteristic(models.Model): 
    taste_profile = models.ForeignKey(
        TasteProfile, 
        on_delete=models.CASCADE, 
        related_name="flavor_characteristic_links"
    )
    flavor_characteristic=models.ForeignKey(
        FlavorCharacteristic, 
        on_delete=models.CASCADE,
        related_name="profile_links"
    ) 
    value=models.DecimalField(max_digits=5, decimal_places=2)

    class Meta:
        constraints = [
            models.UniqueConstraint(
                fields=["taste_profile", "flavor_characteristic"],
                name="unique_profile_flavor_characteristic",
            )
        ]
    def __str__(self):
        return f"{self.taste_profile} – {self.flavor_characteristic} = {self.value}"
