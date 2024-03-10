import os

from django.db import models
from django.dispatch import receiver
from django.db.models.signals import pre_delete


# Create your models here.
class Post(models.Model):
    owner = models.ForeignKey(
        "auth.User", related_name="posts", on_delete=models.CASCADE
    )
    content = models.CharField(max_length=4000)
    post_image = models.ImageField(upload_to="post_images", null=True, blank=True)
    post_date = models.DateField(auto_now_add=True)
    category = models.CharField(max_length=3000, default=None, blank=True, null=True)

    def __str__(self):
        return self.content


@receiver(pre_delete, sender=Post)
def delete_post_image(sender, instance, **kwargs):
    if instance.post_image:
        if os.path.isfile(instance.post_image.path):
            os.remove(instance.post_image.path)
