from rest_framework import serializers

from ..models.course import Course
from ..serializers.multi_language_string_serializer import MultiLanguageStringSerializer

class CourseSerializer(serializers.ModelSerializer):
    """
    Serializer for Course model.
    """
    title = MultiLanguageStringSerializer(many=False, read_only=True)
    description = MultiLanguageStringSerializer(many=False, read_only=True)
    start_date = serializers.DateField(format="%Y-%m-%d", input_formats=["%Y-%m-%d"], required=False, allow_null=True)
    end_date = serializers.DateField(format="%Y-%m-%d", input_formats=["%Y-%m-%d"], required=False, allow_null=True)
    
    class Meta:
        model = Course
        fields = ['title', 'description', 'company', 'start_date', 'end_date']