from rest_framework import serializers

from ..models.work import Work
from ..serializers.multi_language_string_serializer import MultiLanguageStringSerializer

class WorkSerializer(serializers.ModelSerializer):
    """
    Serializer for Work model.
    """
    title = MultiLanguageStringSerializer(many=False, read_only=True)
    skills = MultiLanguageStringSerializer(many=False, read_only=True)
    start_date = serializers.DateField(format="%Y-%m-%d", input_formats=["%Y-%m-%d"], required=False, allow_null=True)
    end_date = serializers.DateField(format="%Y-%m-%d", input_formats=["%Y-%m-%d"], required=False, allow_null=True)
    is_it = serializers.BooleanField(default=False, help_text="Indicates if the work is in the IT field")

    class Meta:
        model = Work
        fields = ['title', 'company', 'place', 'start_date', 'end_date', 'skills', 'is_it']