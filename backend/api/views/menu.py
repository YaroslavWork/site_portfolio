from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status

from ..serializers.multi_language_string_serializer import MultiLanguageStringSerializer
from ..models.multi_language_string import MultiLanguageString

from ..constans.language import LANGUAGE_SHORTS

class MenuView(APIView):
    """
    API view to handle menu sector requests.
    """

    def get(self, request):
        language = request.query_params.get('language', 'en')

        if language not in LANGUAGE_SHORTS:
            return Response(
                {"error": "Invalid language parameter. Use 'en', 'pl', or 'ua'."},
                status=status.HTTP_400_BAD_REQUEST
            )
        
        menu_titles = [
            'control_center_title',
            'paths_title',
            'language_title',
            'themes_title',
            'home_button',
            'about_me_button',
            'skills_button',
            'projects_button',
            'work_experience_button',
            'education_button',
            'contact_button',
            'default_button',
            'english_button',
            'polish_button',
            'ukrainian_button',
            'light_button',
            'dark_button'
        ]

        multi_language_strings = MultiLanguageString.objects.filter(title__in=menu_titles)
        serializer = MultiLanguageStringSerializer(multi_language_strings, many=True)
        
        language_key = LANGUAGE_SHORTS[language]
        filtered_data = {
            "menu": [
                {
                    'title': item['title'],
                    'text': item[language_key]
                }
                for item in serializer.data
            ]
        }

        return Response(
            {
                "language": language,
                "data": filtered_data
            },
            status=status.HTTP_200_OK
        )