from rest_framework import serializers
from ..models.book import Book

from ..serializers.multi_language_string_serializer import MultiLanguageStringSerializer

class BookSerializer(serializers.ModelSerializer):
    """
    Serializer for Book model.
    """
    title = MultiLanguageStringSerializer(many=False, read_only=True)

    class Meta:
        model = Book
        fields = ['author', 'title', 'progress']

        extra_kwargs = {
            'author': {'required': True, 'allow_blank': False},
            'progress': {'required': False, 'default': 0.0}
        }