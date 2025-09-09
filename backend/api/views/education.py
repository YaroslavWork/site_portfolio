from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status

from ..serializers.multi_language_string_serializer import MultiLanguageStringSerializer
from ..serializers.education_serializer import EducationSerializer
from ..serializers.course_serializer import CourseSerializer

from ..models.multi_language_string import MultiLanguageString
from ..models.education import Education
from ..models.course import Course

from ..constans.language import LANGUAGE_SHORTS

class EducationView(APIView):
    """
    View to handle education related requests.
    """
    
    def get(self, request):
        language = request.query_params.get('language', 'en')

        if language not in LANGUAGE_SHORTS:
            return Response(
                {"error": "Invalid language parameter. Use 'en', 'pl', or 'ua'."},
                status=status.HTTP_400_BAD_REQUEST
            )
        
        # Fetch multi-language strings for the about me section
        educations_titles = [
            'spark_education_string1',
            'courses_title',
            'education_title',
        ]

        multi_language_strings = MultiLanguageString.objects.filter(title__in=educations_titles)
        serializer = MultiLanguageStringSerializer(multi_language_strings, many=True)

        # Education
        educations = Education.objects.all()
        education_serializer = EducationSerializer(educations, many=True)
        
        # Courses
        courses = Course.objects.all()
        course_serializer = CourseSerializer(courses, many=True)

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
            "courses": [
                {
                    'title': course['title'][language_key],
                    'description': course['description'][language_key] if course['description'] else "",
                    'company': course['company'],
                    'start_date': course['start_date'] if course['start_date'] else None,
                    'end_date': course['end_date'] if course['end_date'] else None,
                }
                for course in course_serializer.data
            ],
            "educations": [
                {
                    'institution': education['institution'][language_key],
                    'degree': education['degree'][language_key],
                    'field_of_study': education['field_of_study'][language_key],
                    'start_date': education['start_date'],
                    'end_date': education['end_date'] if education['end_date'] else "Present",
                }
                for education in education_serializer.data
            ]
        }

        return Response({
            "language": language,
            "data": filtered_data
        }, status=status.HTTP_200_OK)