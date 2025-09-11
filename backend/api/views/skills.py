from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status

from ..serializers.multi_language_string_serializer import MultiLanguageStringSerializer
from ..serializers.skill_serializer import SkillSerializer

from ..models.multi_language_string import MultiLanguageString
from ..models.skill import Skill
from ..models.project import Project


from ..constans.language import LANGUAGE_SHORTS

class SkillsView(APIView):
    """
    View to handle skills related requests.
    """
    
    def get(self, request):
        language = request.query_params.get('language', 'en')

        if language not in LANGUAGE_SHORTS:
            return Response(
                {"error": "Invalid language parameter. Use 'en', 'pl', or 'ua'."},
                status=status.HTTP_400_BAD_REQUEST
            )
        
        # Fetch multi-language strings for the about me section
        skills_titles = [
            'spark_skills_string1',
            'what_i_know_title',
            'what_i_learn_title',
            'what_i_plan_title',
            'used_in_projects_title',
            'projects_button'
        ]

        multi_language_strings = MultiLanguageString.objects.filter(title__in=skills_titles)
        serializer = MultiLanguageStringSerializer(multi_language_strings, many=True)

        # Skills
        skills = Skill.objects.all()
        skill_serializer = SkillSerializer(skills, many=True)

        language_key = LANGUAGE_SHORTS[language]

        # Find this skill in projects
        projects = Project.objects.all()
        for skill in skill_serializer.data:
            for skill in skill_serializer.data:
                skill['used_in_projects'] = [
                    getattr(project.name, language_key)
                    for project in projects
                        if skill['title']['name'] in [tech.name for tech in project.technologies.all()]
                ]

        # Add all data into one response
        
        filtered_data = {
            "titles": [
                {
                    'title': item['title'],
                    'text': item[language_key]
                } for item in serializer.data
            ],
            "skills": [
                {
                    "title": skill['title']['name'],
                    "type": skill['title']['technology_type']['name'][language_key],
                    "used_in_projects": skill['used_in_projects'],
                    "stuff_i_know": skill['stuff_i_know'][language_key],
                    "stuff_i_learn": skill['stuff_i_learn'][language_key],
                    "stuff_i_plan": skill['stuff_i_plan'][language_key],
                } for skill in skill_serializer.data
            ]
        }

        return Response({
            "language": language,
            "data": filtered_data
        }, status=status.HTTP_200_OK)