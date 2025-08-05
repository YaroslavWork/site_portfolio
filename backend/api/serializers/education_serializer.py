from rest_framework import serializers

from ..models.education import Education
from ..serializers.multi_language_string_serializer import MultiLanguageStringSerializer

class EducationSerializer(serializers.ModelSerializer):
    """
    Serializer for Education model.
    """
    institution = MultiLanguageStringSerializer(many=False, read_only=True)
    degree = MultiLanguageStringSerializer(many=False, read_only=True)
    field_of_study = MultiLanguageStringSerializer(many=False, read_only=True)
    start_date = serializers.DateField(format="%Y-%m-%d", input_formats=["%Y-%m-%d"], required=False, allow_null=True)
    end_date = serializers.DateField(format="%Y-%m-%d", input_formats=["%Y-%m-%d"], required=False, allow_null=True)
    
    class Meta:
        model = Education
        fields = ['institution', 'degree', 'field_of_study', 'start_date', 'end_date']
    