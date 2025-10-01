from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from collections import defaultdict

from ..serializers.multi_language_string_serializer import MultiLanguageStringSerializer
from ..serializers.skill_serializer import SkillSerializer

from ..models.multi_language_string import MultiLanguageString
from ..models.skill import Skill
from ..models.project import Project

from ..utils.search import find_similar_match

from ..constans.language import LANGUAGE_SHORTS

class SkillsView(APIView):
    def get(self, request):
        language = request.query_params.get('language', 'en')
        search = request.query_params.get('search', '')
        language_key = LANGUAGE_SHORTS.get(language, 'en')
        
        skills_titles = [
            'spark_skills_string1',
            'what_i_know_title',
            'what_i_learn_title',
            'what_i_plan_title',
            'used_in_projects_title',
            'projects_button'
        ]
        
        multi_language_strings = MultiLanguageString.objects.filter(title__in=skills_titles)
        titles_serializer = MultiLanguageStringSerializer(multi_language_strings, many=True)
        
        skill_to_projects_map = defaultdict(list)
        projects = Project.objects.prefetch_related('technologies', 'name')
        for project in projects:
            project_name = getattr(project.name, language_key)
            for tech in project.technologies.all():
                skill_to_projects_map[tech.name].append(project_name)

        skills = Skill.objects.select_related(
            'title__technology_type__name', 
            'stuff_i_know', 
            'stuff_i_learn', 
            'stuff_i_plan'
        ).all()
        
        context = {'request': request, 'skill_to_projects_map': skill_to_projects_map}
        skill_serializer = SkillSerializer(skills, many=True, context=context)
        all_skills_data = skill_serializer.data

        searched_skills_names = []
        if search:
            all_skill_names = [skill['title'] for skill in all_skills_data]
            searched_skills_names = find_similar_match(search, all_skill_names, amount_of_return_candidate=4)

        searched_skills = [skill for skill in all_skills_data if skill['title'] in searched_skills_names]
        regular_skills = [skill for skill in all_skills_data if skill['title'] not in searched_skills_names]
        
        order_map = {name: i for i, name in enumerate(searched_skills_names)}
        searched_skills.sort(key=lambda skill: order_map[skill['title']])

        response_data = {
            "titles": [
                {'title': item['title'], 'text': item[language_key]}
                for item in titles_serializer.data
            ],
            "searched_skills": searched_skills,
            "skills": regular_skills
        }

        return Response({
            "language": language,
            "data": response_data
        }, status=status.HTTP_200_OK)