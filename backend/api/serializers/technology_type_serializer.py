from rest_framework import serializers

from ..models.technology_type import TechnologyType
from ..serializers.multi_language_string_serializer import MultiLanguageStringSerializer

class TechnologyTypeSerializer(serializers.ModelSerializer):
    """
    Serializer for TechnologyType model.
    """
    name = MultiLanguageStringSerializer(many=False, read_only=True)
    
    class Meta:
        model = TechnologyType
        fields = ['title', 'name']