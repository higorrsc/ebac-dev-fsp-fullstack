from django.db import models
from posts.models import Post


# Create your models here.
class Vote(models.Model):
    post = models.ForeignKey(Post, related_name="votes", on_delete=models.CASCADE)
    up_vote_by = models.ForeignKey(
        "auth.User",
        related_name="up_vote_user",
        on_delete=models.CASCADE,
        default=None,
        blank=True,
        null=True,
    )
    down_vote_by = models.ForeignKey(
        "auth.User",
        related_name="down_vote_user",
        on_delete=models.CASCADE,
        default=None,
        blank=True,
        null=True,
    )

    def __str__(self):
        return f"({'U' if self.up_vote_by else 'D'} - {self.up_vote_by or self.down_vote_by}) {self.post.content}"
