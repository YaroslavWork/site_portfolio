from rest_framework import serializers

from ..models.technology import Technology

from ..serializers.multi_language_string_serializer import MultiLanguageStringSerializer
from ..serializers.technology_type_serializer import TechnologyTypeSerializer

class TechnologySerializer(serializers.ModelSerializer):
    technology_type = TechnologyTypeSerializer(read_only=True)

    class Meta:
        model = Technology
        fields = ['name', 'technology_type']

    def to_representation(self, instance):
        self.fields['technology_type'].context.update(self.context)
        return super().to_representation(instance)