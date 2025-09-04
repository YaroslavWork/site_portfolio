from rest_framework import serializers

from ..models.company import Company
from ..serializers.skill_serializer import SkillSerializer

class CompanySerializer(serializers.ModelSerializer):
    """
    Serializer for Skill model.
    """
    skills = SkillSerializer(many=False, read_only=True)

    class Meta:
        model = Company
        fields = [ 
            'code',
            'name',
            'company_color',
            'cv_path',
            'cover_letter_path',
            'skills'
        ]