from django.contrib.auth.models import User
from rest_framework import serializers

from .models import FriendshipRequest


class FriendshipRequestSerializer(serializers.ModelSerializer):
    class Meta:
        model = FriendshipRequest
        fields = ("id", "request_from", "request_to", "status_request")
