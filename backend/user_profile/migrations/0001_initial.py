# Generated by Django 5.0.3 on 2024-05-28 00:28

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
            name="UserProfile",
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
                ("first_name", models.CharField(max_length=150)),
                ("last_name", models.CharField(max_length=150)),
                (
                    "gender",
                    models.CharField(
                        choices=[
                            ("male", "Male"),
                            ("female", "Female"),
                            ("other", "Other"),
                        ],
                        default="male",
                        max_length=20,
                    ),
                ),
                ("dob", models.DateField(blank=True, default=None, null=True)),
                ("phone", models.CharField(blank=True, max_length=20, null=True)),
                ("works_at", models.CharField(blank=True, max_length=200, null=True)),
                ("lives_in", models.CharField(blank=True, max_length=200, null=True)),
                ("studies_at", models.CharField(blank=True, max_length=200, null=True)),
                (
                    "profile_image",
                    models.ImageField(
                        blank=True, null=True, upload_to="profile_images"
                    ),
                ),
                (
                    "owner",
                    models.OneToOneField(
                        on_delete=django.db.models.deletion.CASCADE,
                        related_name="profile_data",
                        to=settings.AUTH_USER_MODEL,
                    ),
                ),
            ],
        ),
    ]
