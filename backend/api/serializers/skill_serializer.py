from rest_framework import serializers

from ..models.skill import Skill
from ..serializers.multi_language_string_serializer import MultiLanguageStringSerializer
from ..serializers.technology_serializer import TechnologySerializer

class SkillSerializer(serializers.ModelSerializer):
    """
    Serializer for Skill model.
    """
    title = TechnologySerializer(many=False, read_only=True)
    stuff_i_know = MultiLanguageStringSerializer(many=False, read_only=True)
    stuff_i_learn = MultiLanguageStringSerializer(many=False, read_only=True)
    stuff_i_plan = MultiLanguageStringSerializer(many=False, read_only=True)

    class Meta:
        model = Skill
        fields = [ 
            'title', 
            'stuff_i_know', 
            'stuff_i_learn', 
            'stuff_i_plan', 
        ]