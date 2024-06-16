from django.shortcuts import render, get_object_or_404
from rest_framework import serializers, viewsets, status, permissions

from .models import Vote
from .permissions import hasSelfVotedOrReadOnly
from .serializers import VoteSerializer

from posts.models import Post


# Create your views here.
class VoteViewSet(viewsets.ModelViewSet):
    queryset = Vote.objects.all().order_by("id")
    serializer_class = VoteSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly, hasSelfVotedOrReadOnly]

    def perform_create(self, serializer):
        post_instance = get_object_or_404(Post, pk=self.request.data["post"])

        # if user likes the post
        if self.request.data["up_vote"]:
            already_up_voted = Vote.objects.filter(
                post=post_instance, up_vote_by=self.request.user
            ).exists()
            if already_up_voted:
                raise serializers.ValidationError(
                    {"message": "Você já deu like neste post!"}
                )
            else:
                serializer.save(up_vote_by=self.request.user, post=post_instance)
        # if dislikes
        else:
            already_down_voted = Vote.objects.filter(
                post=post_instance, down_vote_by=self.request.user
            ).exists()
            if already_down_voted:
                raise serializers.ValidationError(
                    {"message": "Você já deu dislike neste post!"}
                )
            else:
                serializer.save(down_vote_by=self.request.user, post=post_instance)
