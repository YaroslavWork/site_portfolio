from rest_framework import serializers

from ..models import Project

from .reference_serializer import ReferenceSerializer
from .technology_serializer import TechnologySerializer
from .multi_language_string_serializer import MultiLanguageStringSerializer

class ProjectSerializer(serializers.ModelSerializer):

    name = MultiLanguageStringSerializer(many=False, read_only=True)
    technologies = TechnologySerializer(many=True, read_only=True)
    description = MultiLanguageStringSerializer(many=False, read_only=True)
    references = ReferenceSerializer(many=True, read_only=True)
    

    class Meta:
        model = Project
        fields = ['name', 'technologies', 'description', 'references', 'image_paths']
        extra_kwargs = {
            'name': {'required': True},
            'description': {'required': True}
        }