from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status

from ..serializers.multi_language_string_serializer import MultiLanguageStringSerializer
from ..serializers.project_serializer import ProjectSerializer

from ..models.multi_language_string import MultiLanguageString
from ..models.project import Project

from ..constans.language import LANGUAGE_SHORTS

class ProjectsView(APIView):
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
            'spark_projects_string1',
            'technologies_title',
            'description_title',
            'links_title',
        ]

        multi_language_strings = MultiLanguageString.objects.filter(title__in=skills_titles)
        serializer = MultiLanguageStringSerializer(multi_language_strings, many=True)

        # Skills
        projects = Project.objects.all()
        project_serializer = ProjectSerializer(projects, many=True)

        # Add all data into one response
        language_key = LANGUAGE_SHORTS[language]
        filtered_data = {
            "titles": [
                {
                    'title': item['title'],
                    'text': item[language_key]
                }
                for item in serializer.data
            ],
            "projects": [
                {
                    'name': project['name'][language_key],
                    'technologies': [
                        {
                            'name': tech['name'],
                            'type': tech['technology_type']['name'][language_key]
                        }
                        for tech in project['technologies']
                    ],
                    'description': project['description'][language_key],
                    'references': [
                        {
                            'name': reference['host']['name'],
                            'url': reference['url'],
                            'icon_path': reference['host']['icon_path'],
                        }
                        for reference in project['references']
                    ],
                    'image_paths': [
                        # Separate image paths by ';'
                        path.strip() for path in project['image_paths'].split(';') if path.strip()
                    ]
                }
                for project in project_serializer.data
            ]
        }

        return Response({
            "language": language,
            "data": filtered_data
        }, status=status.HTTP_200_OK)