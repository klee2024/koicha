from rest_framework import serializers
from django.db import transaction
from django.contrib.auth import get_user_model
from apps.taste_profiles.models import (
    TasteProfile,
    TasteProfileFlavorDimension,
    FlavorCharacteristic,
)

from rest_framework_simplejwt.serializers import TokenObtainPairSerializer

User = get_user_model()


class RegisterSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True, min_length=8)

    class Meta:
        model = User
        fields = ["id", "email", "username", "password"]

    # ensures that if creating any of the objects fails, the whole user
    # creation path fails 
    @transaction.atomic
    def create(self, validated_data):
        password = validated_data.pop("password")
        user = User(**validated_data)
        user.set_password(password)  # hashes password
        user.save()

        # create the user's taste profile and seed defaults
        taste_profile = TasteProfile.objects.create(user=user)
        main_characteristics = FlavorCharacteristic.objects.filter(parent__isnull=True, is_active=True)
        TasteProfileFlavorDimension.objects.bulk_create([
            TasteProfileFlavorDimension(
                taste_profile=taste_profile,
                characteristic=fc,
                value=50, # default flavor characteristic value
            )
            for fc in main_characteristics
        ])

        return user

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ["id", "email", "username"]

class UserTokenObtainPairSerializer(TokenObtainPairSerializer): 
    @classmethod 
    def get_token(cls, user):
        token = super().get_token(user)
        return token

    def validate(self, attrs):
        data = super().validate(attrs)
        data['user'] = {
            "id": self.user.id,
            "username": self.user.username,
            "email": self.user.email
        }
        return data 
