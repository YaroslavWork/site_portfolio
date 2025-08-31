from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status

from ..serializers.multi_language_string_serializer import MultiLanguageStringSerializer
from ..serializers.work_serializer import WorkSerializer

from ..models.multi_language_string import MultiLanguageString
from ..models.work import Work

from ..constans.language import LANGUAGE_SHORTS

class WorkExperienceView(APIView):
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
            'spark_work_experience_string1',
            'it_jobs_title',
            'other_jobs_title',
            'you_are_here_title',
            'it_job_none_description',
            'contact_button'
        ]

        multi_language_strings = MultiLanguageString.objects.filter(title__in=skills_titles)
        serializer = MultiLanguageStringSerializer(multi_language_strings, many=True)

        # Skills
        work = Work.objects.all()
        work_serializer = WorkSerializer(work, many=True)

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
            "it_jobs": [
                # If is_it is True, it is an IT job
                {
                    "title": work['title'][language_key],
                    "company": work['company'],
                    "place": work['place'],
                    "start_date": work['start_date'],
                    "end_date": work['end_date'] if work['end_date'] else "Present",
                    "skills": work['skills'][language_key],
                } for work in work_serializer.data if work.get('is_it', False)
            ],
            "other_jobs": [
                # If is_it is False, it is a non-IT job
                {
                    "title": work['title'][language_key],
                    "company": work['company'],
                    "place": work['place'],
                    "start_date": work['start_date'],
                    "end_date": work['end_date'] if work['end_date'] else "Present",
                    "skills": work['skills'][language_key],
                } for work in work_serializer.data if not work.get('is_it', False)
            ]
        }

        return Response({
            "language": language,
            "data": filtered_data
        }, status=status.HTTP_200_OK)