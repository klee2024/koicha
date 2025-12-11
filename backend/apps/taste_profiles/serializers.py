from rest_framework import serializers
from ..users.serializers import UserSerializer
from .models import TasteProfile, FlavorCharacteristic, TasteProfileArchetype, TasteProfileFlavorCharacteristic, TasteProfileDetail

class FlavorCharacteristicSerializer(serializers.ModelSerializer):
    class Meta:
        model = FlavorCharacteristic
        fields = ["id", "slug", "name", "hierarchy"]


class TasteProfileFlavorCharacteristicSerializer(serializers.ModelSerializer):
    flavor_characteristic = FlavorCharacteristicSerializer()

    class Meta:
        model = TasteProfileFlavorCharacteristic
        fields = ["id", "taste_profile", "flavor_characteristic", "value"]


class TasteProfileArchetypeSerializer(serializers.ModelSerializer):
    class Meta:
        model = TasteProfileArchetype
        fields = ["id", "slug", "name", "description"]


class TasteProfileDetailSerializer(serializers.ModelSerializer):
    archetype = TasteProfileArchetypeSerializer()

    class Meta:
        model = TasteProfileDetail
        fields = [
            "id",
            "taste_profile",
            "dimension",
            "archetype",
            "archetype_match",
            "detail_description",
        ]


class TasteProfileSerializer(serializers.ModelSerializer):
    flavor_characteristic_values = TasteProfileFlavorCharacteristicSerializer(many=True)
    details = TasteProfileDetailSerializer(many=True, read_only=True)
    user = serializers.PrimaryKeyRelatedField(read_only=True)

    class Meta:
        model = TasteProfile
        fields = ["id", "user", "flavor_characteristic_values", "details"]
