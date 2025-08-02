from rest_framework import serializers
from ..models.multi_language_string import MultiLanguageString

class MultiLanguageStringSerializer(serializers.ModelSerializer):
    """
    Serializer for MultiLanguageString model.
    """
    
    class Meta:
        model = MultiLanguageString
        fields = ['title', 'english', 'polish', 'ukrainian']
        extra_kwargs = {
            'polish': {'required': False, 'allow_blank': True},
            'ukrainian': {'required': False, 'allow_blank': True}
        }