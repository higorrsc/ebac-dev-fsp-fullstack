from django.shortcuts import render
from rest_framework import viewsets, permissions, status

from .models import Post
from .serializers import PostSerializer

from user_profile.permissions import IsOwnerOrReadOnly


# Create your views here.
class PostViewSet(viewsets.ModelViewSet):
    queryset = Post.objects.all().order_by("id")
    serializer_class = PostSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly, IsOwnerOrReadOnly]

    def perform_create(self, serializer):
        serializer.save(owner=self.request.user)
