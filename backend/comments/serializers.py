from rest_framework import serializers

from .models import Comment


class CommentSerializer(serializers.ModelSerializer):
    commented_by = serializers.ReadOnlyField(source="owner.username")
    owner = serializers.ReadOnlyField(source="owner.id")

    class Meta:
        model = Comment
        fields = (
            "id",
            "comment",
            "comment_image",
            "comment_date",
            "owner",
            "commented_by",
            "post",
        )
