# Generated by Django 5.0.2 on 2024-02-24 00:15

import django.db.models.deletion
from django.conf import settings
from django.db import migrations, models


class Migration(migrations.Migration):
    initial = True

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name="Post",
            fields=[
                (
                    "id",
                    models.BigAutoField(
                        auto_created=True,
                        primary_key=True,
                        serialize=False,
                        verbose_name="ID",
                    ),
                ),
                ("content", models.CharField(max_length=4000)),
                (
                    "post_image",
                    models.ImageField(blank=True, null=True, upload_to="post_image"),
                ),
                ("post_date", models.DateField(auto_now_add=True)),
                (
                    "category",
                    models.CharField(
                        blank=True, default=None, max_length=3000, null=True
                    ),
                ),
                (
                    "owner",
                    models.ForeignKey(
                        on_delete=django.db.models.deletion.CASCADE,
                        related_name="posts",
                        to=settings.AUTH_USER_MODEL,
                    ),
                ),
            ],
        ),
    ]
