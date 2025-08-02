from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status

from ..serializers.multi_language_string_serializer import MultiLanguageStringSerializer
from ..models.multi_language_string import MultiLanguageString

class HomeView(APIView):
    """
    API view to handle home page requests.
    """

    def get(self, request):
        language = request.query_params.get('language', 'en')

        if language not in ['en', 'pl', 'ua']:
            return Response(
                {"error": "Invalid language parameter. Use 'en', 'pl', or 'ua'."},
                status=status.HTTP_400_BAD_REQUEST
            )
        
        imported_titles = [
            'name',
            'position',
            'short_description',
            'about_me_button',
            'skills_button',
            'projects_button',
            'personality_code_description',
            'contact_button',
            'spark_main_page_string1'
        ]

        language_field = {
            'en': 'english',
            'pl': 'polish',
            'ua': 'ukrainian'
        }

        # Fetch multi-language strings based on the imported titles
        multi_language_strings = MultiLanguageString.objects.filter(title__in=imported_titles)

        # Serialize the fetched multi-language strings
        serializer = MultiLanguageStringSerializer(multi_language_strings, many=True)
        
        # Filter to only include the requested language in the response
        language_key = language_field[language]
        filtered_data = [
            {
                'title': item['title'],
                'text': item[language_key]
            }
            for item in serializer.data
        ]

        return Response(
            {
                "language": language,
                "data": filtered_data
            },
            status=status.HTTP_200_OK
        )
