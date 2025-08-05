from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status

from ..serializers.multi_language_string_serializer import MultiLanguageStringSerializer
from ..serializers.contact_serializer import ContactSerializer

from ..models.contact import Contact
from ..models.multi_language_string import MultiLanguageString

from ..constans.language import LANGUAGE_SHORTS

class ContactView(APIView):
    """
    API view to handle contact page requests.
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
            'spark_contact_string1',
        ]

        multi_language_strings = MultiLanguageString.objects.filter(title__in=skills_titles)
        serializer = MultiLanguageStringSerializer(multi_language_strings, many=True)
        
        # Contacts
        contacts = Contact.objects.all()
        contact_serializer = ContactSerializer(contacts, many=True)

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
            "contacts": [
                {
                    'identification': contact['identification'],
                    'icon_path': contact['icon_path'],
                } for contact in contact_serializer.data
            ]
        }

        return Response(filtered_data, status=status.HTTP_200_OK)