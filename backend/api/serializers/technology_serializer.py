from rest_framework import serializers

from ..models.technology import Technology

from ..serializers.multi_language_string_serializer import MultiLanguageStringSerializer
from ..serializers.technology_type_serializer import TechnologyTypeSerializer

class TechnologySerializer(serializers.ModelSerializer):
    """
    Serializer for Technology model.
    """
    technology_type = TechnologyTypeSerializer(many=False, read_only=True)

    class Meta:
        model = Technology
        fields = ['name', 'technology_type']
        

    