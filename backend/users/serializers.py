from django.contrib.auth.models import User
from rest_framework import serializers

from user_profile.serializers import ProfileSerializer


class UserSerializer(serializers.ModelSerializer):
    profile_data = ProfileSerializer(read_only=True)

    class Meta:
        model = User
        fields = ("id", "username", "email", "is_active", "password", "profile_data")
        extra_kwargs = {
            "email": {"required": True},
            "password": {"write_only": True},
        }

    def create(self, validated_data):
        user = User(email=validated_data["email"], username=validated_data["username"])
        user.set_password(validated_data["password"])
        user.save()
        return user
