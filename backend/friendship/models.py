from django.db import models


# Create your models here.
class FriendshipRequest(models.Model):
    status = (
        ("pending", "Pending"),
        ("accepted", "Accepted"),
        ("rejected", "Rejected"),
    )
    request_from = models.ForeignKey(
        "auth.User",
        on_delete=models.CASCADE,
        related_name="request_from",
        default=None,
        null=False,
    )
    request_to = models.ForeignKey(
        "auth.User",
        on_delete=models.CASCADE,
        related_name="request_to",
        default=None,
        null=False,
    )
    status_request = models.CharField(max_length=10, choices=status, default="pending")
