from django.http import Http404
from django.contrib.auth.models import User
from rest_framework import viewsets, permissions

from .models import UserProfile
from .permissions import IsOwnerOrReadOnly
from .serializers import ProfileSerializer


# Create your views here.
class ProfileViewSet(viewsets.ModelViewSet):
    queryset = UserProfile.objects.all()
    serializer_class = ProfileSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly, IsOwnerOrReadOnly]

    def perform_create(self, serializer):
        serializer.save(owner=self.request.user)

    def get_object(self):
        username = self.kwargs.get("username")
        try:
            user = User.objects.get(username=username)
            return self.queryset.get(owner=user)
        except User.DoesNotExist:
            raise Http404
