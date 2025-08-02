from rest_framework import serializers
from ..models.hobby import Hobby

from ..serializers.multi_language_string_serializer import MultiLanguageStringSerializer

class HobbySerializer(serializers.ModelSerializer):
    """
    Serializer for Hobby model.
    """
    name = MultiLanguageStringSerializer(many=False, read_only=True)
    description = MultiLanguageStringSerializer(many=False, read_only=True)
    
    class Meta:
        model = Hobby
        fields = ['id', 'name', 'description', 'icon_path']
        extra_kwargs = {
            'id': {'read_only': True},
            'name': {'required': True},
            'description': {'required': True}
        }
    