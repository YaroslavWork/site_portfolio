from rest_framework import serializers

from ..models.company import Company
from ..serializers.skill_serializer import SkillSerializer

class CompanySerializer(serializers.ModelSerializer):
    """
    Serializer for Company model.
    """

    skills = SkillSerializer(many=True, read_only=True)

    class Meta:
        model = Company
        fields = [
            'code',
            'name',
            'company_color',
            'cv_file',
            'cover_letter_file',
            'skills' 
        ]