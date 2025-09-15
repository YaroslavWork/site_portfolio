from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status

from ..serializers.multi_language_string_serializer import MultiLanguageStringSerializer
from ..models.multi_language_string import MultiLanguageString

from ..constans.language import LANGUAGE_SHORTS

class NotFoundView(APIView):
    """
    API view to handle 404 page
    """

    def get(self, request):
        language = request.query_params.get('404', 'en')

        if language not in LANGUAGE_SHORTS:
            return Response(
                {"error": "Invalid language parameter. Use 'en', 'pl', or 'ua'."},
                status=status.HTTP_400_BAD_REQUEST
            )
        
        imported_titles = [
            'spark_not_found_page_string1',
        ]

        multi_language_strings = MultiLanguageString.objects.filter(title__in=imported_titles)
        serializer = MultiLanguageStringSerializer(multi_language_strings, many=True)
        language_key = LANGUAGE_SHORTS[language]
        filtered_data = {
            "titles": [
                {
                    'title': item['title'],
                    'text': item[language_key]
                }
                for item in serializer.data
            ],
        }

        return Response(
            {
                "language": language,
                "data": filtered_data
            },
            status=status.HTTP_200_OK
        )
