import os

from django.db import models
from django.dispatch import receiver
from django.db.models.signals import pre_delete

from posts.models import Post


# Create your models here.
class Comment(models.Model):
    owner = models.ForeignKey("auth.User", on_delete=models.CASCADE)
    post = models.ForeignKey(Post, related_name="comments", on_delete=models.CASCADE)
    comment = models.CharField(max_length=280)
    comment_image = models.ImageField(upload_to="comment_images", null=True, blank=True)
    comment_date = models.DateField(auto_now_add=True)

    def __str__(self):
        return self.comment


@receiver(pre_delete, sender=Comment)
def delete_comment_image(sender, instance, **kwargs):
    if instance.comment_image:
        if os.path.isfile(instance.comment_image.path):
            os.remove(instance.comment_image.path)
