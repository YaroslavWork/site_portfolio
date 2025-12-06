
from rest_framework import serializers
from ..models import Skill
from ..constans.language import LANGUAGE_SHORTS

class SkillSerializer(serializers.ModelSerializer):
    title = serializers.CharField(source='title.name', read_only=True)
    type = serializers.CharField(source='title.technology_type.name.language', read_only=True)
    hue_color = serializers.IntegerField(source='title.technology_type.hue_color', read_only=True)
    used_in_projects = serializers.SerializerMethodField()

    stuff_i_know = serializers.SerializerMethodField()
    stuff_i_learn = serializers.SerializerMethodField()
    stuff_i_plan = serializers.SerializerMethodField()

    class Meta:
        model = Skill
        fields = [
            'title', 'type', 'hue_color', 'used_in_projects',
            'stuff_i_know', 'stuff_i_learn', 'stuff_i_plan',
        ]

    def get_language_key(self):
        request = self.context.get('request')
        if request:
            language_code = request.query_params.get('language', 'en')
            return LANGUAGE_SHORTS.get(language_code, 'english')
        return LANGUAGE_SHORTS.get('english')

    def get_stuff_i_know(self, obj):
        language_key = self.get_language_key()
        return getattr(obj.stuff_i_know, language_key, "") if obj.stuff_i_know else ""

    def get_stuff_i_learn(self, obj):
        language_key = self.get_language_key()
        return getattr(obj.stuff_i_learn, language_key, "") if obj.stuff_i_learn else ""

    def get_stuff_i_plan(self, obj):
        language_key = self.get_language_key()
        return getattr(obj.stuff_i_plan, language_key, "") if obj.stuff_i_plan else ""

    def get_used_in_projects(self, obj):
        skill_to_projects_map = self.context.get('skill_to_projects_map', {})
        return skill_to_projects_map.get(obj.title.name, [])