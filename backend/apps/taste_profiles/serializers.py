from rest_framework import serializers
from ..users.serializers import UserSerializer
from .models import TasteProfile, FlavorCharacteristic, TasteProfileArchetype, TasteProfileFlavorDimension, TasteProfileDetail

class FlavorCharacteristicSerializer(serializers.ModelSerializer):
    class Meta:
        model = FlavorCharacteristic
        fields = ["id", "slug", "name", "parent"]


class TasteProfileFlavorDimensionSerializer(serializers.ModelSerializer):
    characteristic = FlavorCharacteristicSerializer(read_only=True)

    class Meta:
        model = TasteProfileFlavorDimension
        fields = ["id", "characteristic", "value", "confidence"]


class TasteProfileArchetypeSerializer(serializers.ModelSerializer):
    class Meta:
        model = TasteProfileArchetype
        fields = ["id", "slug", "name", "description"]


class TasteProfileDetailSerializer(serializers.ModelSerializer):
    archetype = TasteProfileArchetypeSerializer(read_only=True)

    class Meta:
        model = TasteProfileDetail
        fields = [
            "id",
            "dimension",
            "archetype",
            "archetype_match",
            "detail_description",
        ]


class TasteProfileSerializer(serializers.ModelSerializer):
    flavor_dimensions = TasteProfileFlavorDimensionSerializer(many=True)
    details = TasteProfileDetailSerializer(many=True, read_only=True)
    user = serializers.PrimaryKeyRelatedField(read_only=True)

    class Meta:
        model = TasteProfile
        fields = ["id", "user", "flavor_dimensions", "details"]
