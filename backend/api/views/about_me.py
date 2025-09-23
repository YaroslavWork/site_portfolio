from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status

from ..serializers.multi_language_string_serializer import MultiLanguageStringSerializer
from ..serializers.book_serializer import BookSerializer
from ..serializers.hobby_serializer import HobbySerializer
from ..models.multi_language_string import MultiLanguageString
from ..models.book import Book
from ..models.hobby import Hobby

from ..constans.language import LANGUAGE_SHORTS

class AboutMeView(APIView):
    """
    API view to handle about me page requests.
    """

    def get(self, request):
        language = request.query_params.get('language', 'en')

        if language not in LANGUAGE_SHORTS:
            return Response(
                {"error": "Invalid language parameter. Use 'en', 'pl', or 'ua'."},
                status=status.HTTP_400_BAD_REQUEST
            )
        
        # Fetch multi-language strings for the about me section
        about_me_titles = [
            'name',
            'cv_title',
            'cover_letter_title',
            'download_pdf_button',
            'download_png_button',
            'description',
            'contact_button',
            'skills_button',
            'projects_button',
            'education_button',
            'spark_about_me_string1',
            'books_title',
            'hobbies_title'
        ]
        multi_language_strings = MultiLanguageString.objects.filter(title__in=about_me_titles)
        serializer = MultiLanguageStringSerializer(multi_language_strings, many=True)

        # Books
        books = Book.objects.all()
        book_serializer = BookSerializer(books, many=True)

        # Hobbies
        hobbies = Hobby.objects.all()
        hobby_serializer = HobbySerializer(hobbies, many=True)


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
            "books": [
                {
                    'author': book['author'],
                    'title': book['title'][language_key],
                    'progress': book['progress']
                }
                for book in book_serializer.data
            ],
            "hobbies": [
                {
                    'name': hobby['name'][language_key],
                    'description': hobby['description'][language_key],
                    'images_path': [
                        path.strip() for path in hobby['images_path'].split(';') if path.strip()
                    ] if hobby['images_path'] else []
                }
                for hobby in hobby_serializer.data
            ]
        }

        return Response(
            {
                "language": language,
                "data": filtered_data
            },
            status=status.HTTP_200_OK
        )