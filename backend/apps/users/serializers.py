from rest_framework import serializers
from django.db import transaction
from django.contrib.auth import get_user_model
from apps.taste_profiles.models import (
    TasteProfile,
    TasteProfileFlavorValue,
    FlavorCharacteristic,
)

User = get_user_model()


class RegisterSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True, min_length=8)

    class Meta:
        model = User
        fields = ["id", "email", "username", "password"]

    @transaction.atomic
    def create(self, validated_data):
        password = validated_data.pop("password")
        user = User(**validated_data)
        user.set_password(password)  # hashes password
        user.save()

        # create the user's taste profile and seed defaults
        taste_profile = TasteProfile.objects.create(user=user)
        main_characteristics = FlavorCharacteristic.objects.filter(parent__isnull=True, active=True)
        TasteProfileFlavorValue.objects.bulk_create([
            TasteProfileFlavorValue(
                taste_profile=taste_profile,
                characteristic=fc,
                value=0, # default flavor characteristic value
            )
            for fc in main_characteristics
        ])

        return user

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ["id", "email", "username"]
