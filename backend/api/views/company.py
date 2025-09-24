from django.http import FileResponse
import os

from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status

from ..models.project import Project

from ..constans.language import LANGUAGE_SHORTS

from ..models.company import Company
from ..models.multi_language_string import MultiLanguageString
from ..serializers.company_serializer import CompanySerializer
from ..serializers.skill_serializer import SkillSerializer
from ..serializers.multi_language_string_serializer import MultiLanguageStringSerializer



class CompanyView(APIView):
    """
    View to handle company related requests.
    """

    def get(self, request, company_code):
        
        language = request.query_params.get('language', 'en')

        if language not in LANGUAGE_SHORTS:
            return Response(
                {"error": "Invalid language parameter. Use 'en', 'pl', or 'ua'."},
                status=status.HTTP_400_BAD_REQUEST
            )
        
        try:
            get_file = request.query_params.get('get_file', '')

            # Convert all in lowercase to avoid case sensitivity issues
            company = Company.objects.get(code__iexact=company_code.lower())
            company_serializer = CompanySerializer(company)

            if get_file == 'cv':
                cv_file_path = company.cv_file.path
                if os.path.exists(cv_file_path):
                    response = FileResponse(open(cv_file_path, 'rb'), content_type='application/pdf')
                    response['Content-Disposition'] = f'attachment; filename="{os.path.basename(cv_file_path)}"'
                    return response
                else:
                    return Response({"error": "CV file not found."}, status=status.HTTP_404_NOT_FOUND)
            
            if get_file == 'cover_letter':
                cover_letter_file_path = company.cover_letter_file.path
                if os.path.exists(cover_letter_file_path):
                    response = FileResponse(open(cover_letter_file_path, 'rb'), content_type='application/pdf')
                    response['Content-Disposition'] = f'attachment; filename="{os.path.basename(cover_letter_file_path)}"'
                    return response
                else:
                    return Response({"error": "Cover letter file not found."}, status=status.HTTP_404_NOT_FOUND)

            companies_titles = [
                'spark_company_string1',
                'company_main_title',
                'company_description_title',
                'company_skills_title',
                'cv_title',
                'cover_letter_title',
                'download_pdf_button',
                'other_skills_title',
                'projects_title',
                'skills_button',
                'projects_button',
                'home_title',
                'home_button',
                'contact_button',
                'what_i_know_title',
                'what_i_learn_title',
                'what_i_plan_title',
                'used_in_projects_title',
                'github_path',
                'linkedin_path'
            ]
            multi_language_strings = MultiLanguageString.objects.filter(title__in=companies_titles)
            serializer = MultiLanguageStringSerializer(multi_language_strings, many=True)

            # Skills
            skills = company.skills.all()
            skills_serializer = SkillSerializer(skills, many=True)

            # Add all data into one response
            language_key = LANGUAGE_SHORTS[language]

            # Find this skill in projects
            projects = Project.objects.all()
            for skill in skills_serializer.data:
                for skill in skills_serializer.data:
                    skill['used_in_projects'] = [
                        getattr(project.name, language_key)
                        for project in projects
                            if skill['title']['name'] in [tech.name for tech in project.technologies.all()]
                    ]

            unfiltered_titles = [
                {
                    'title': item['title'],
                    'text': item[language_key]
                }
                for item in serializer.data
            ]

            for title_obj in unfiltered_titles:
                if title_obj['title'] in ['company_description_title', 'spark_company_string1', 'company_main_title', 'company_skills_title']:
                    # Replace the placeholder with the company name
                    title_obj['text'] = title_obj['text'].replace('${company_name}', f'<b>{company.name}</b>')

            filtered_data = {
                "titles": unfiltered_titles,
                "skills": [
                    {
                        "title": skill['title']['name'],
                        "type": skill['title']['technology_type']['name'][language_key],
                        "used_in_projects": skill['used_in_projects'],
                        "stuff_i_know": skill['stuff_i_know'][language_key],
                        "stuff_i_learn": skill['stuff_i_learn'][language_key],
                        "stuff_i_plan": skill['stuff_i_plan'][language_key],
                    }
                    for skill in skills_serializer.data
                ],
                "other_data":{
                    'company_name': company_serializer.data['name'],
                    'color': company_serializer.data['company_color'],
                }
            }
            

            return Response(
                {
                    "language": language,
                    "data": filtered_data
                },
            status=status.HTTP_200_OK)

        except Company.DoesNotExist:
            not_found_titles = [
                'spark_company_not_found_string1',
                'check_company_code_button'
            ]

            multi_language_strings = MultiLanguageString.objects.filter(title__in=not_found_titles)
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

            return Response({
                "error": "Company not found",
                "data": filtered_data
            }
            , status=404)