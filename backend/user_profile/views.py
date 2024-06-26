from rest_framework import viewsets, permissions

from .models import UserProfile
from .permissions import IsOwnerOrReadOnly
from .serializers import ProfileSerializer


# Create your views here.
class ProfileViewSet(viewsets.ModelViewSet):
    queryset = UserProfile.objects.all().order_by("id")
    serializer_class = ProfileSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly, IsOwnerOrReadOnly]

    def perform_create(self, serializer):
        serializer.save(owner=self.request.user)
