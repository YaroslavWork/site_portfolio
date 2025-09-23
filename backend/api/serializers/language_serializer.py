from rest_framework import serializers

from ..models import Language
from ..serializers.multi_language_string_serializer import MultiLanguageStringSerializer


class LanguageSerializer(serializers.ModelSerializer):

    name = MultiLanguageStringSerializer(many=False, read_only=True)

    class Meta:
        model = Language
        fields = ['name', 'knowledge']