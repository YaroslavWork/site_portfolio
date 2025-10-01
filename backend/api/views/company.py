# your_app/views/company_view.py
from django.http import FileResponse
import os
from collections import defaultdict

from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status

from ..models import Company, Project, MultiLanguageString
from ..serializers.company_serializer import CompanySerializer
from ..constans.language import LANGUAGE_SHORTS

class CompanyView(APIView):
    """
    View to handle company related requests.
    """
    def get(self, request, company_code):
        ## STEP 1: Get parameters and validate language
        language = request.query_params.get('language', 'en')
        get_file = request.query_params.get('get_file')
        language_key = LANGUAGE_SHORTS.get(language, 'english')

        if language not in LANGUAGE_SHORTS:
            return Response({"error": "Invalid language..."}, status=status.HTTP_400_BAD_REQUEST)

        try:
            ## STEP 2: Fetch the company with all related data efficiently
            # Prefetch the skills and their related multi-language fields to avoid N+1 queries later
            company = Company.objects.prefetch_related(
                'skills__title__technology_type__name',
                'skills__stuff_i_know',
                'skills__stuff_i_learn',
                'skills__stuff_i_plan'
            ).get(code__iexact=company_code.lower())

            ## STEP 3: Handle file downloads and exit early
            if get_file == 'cv' and company.cv_file:
                return FileResponse(company.cv_file.open('rb'), as_attachment=True, content_type='application/pdf')
            if get_file == 'cover_letter' and company.cover_letter_file:
                return FileResponse(company.cover_letter_file.open('rb'), as_attachment=True, content_type='application/pdf')

            ## STEP 4: Process multi-language titles efficiently
            titles_to_fetch = [
                'spark_company_string1', 'company_main_title', 'company_description_title',
                'company_skills_title', 'cv_title', 'cover_letter_title', 'download_pdf_button',
                'other_skills_title', 'projects_title', 'skills_button', 'projects_button',
                'home_title', 'home_button', 'contact_button', 'what_i_know_title',
                'what_i_learn_title', 'what_i_plan_title', 'used_in_projects_title',
                'github_path', 'linkedin_path'
            ]
            
            titles = []
            # Fetch strings and format them in one go
            for ml_string in MultiLanguageString.objects.filter(title__in=titles_to_fetch):
                text = getattr(ml_string, language_key, "")
                # Replace placeholder text
                text = text.replace('${company_name}', f'<b>{company.name}</b>')
                
                # Append a dictionary to the list instead of setting a key
                titles.append({
                    'title': ml_string.title,
                    'text': text
                })

            ## STEP 5: Build the skill-to-projects map (the optimal pattern)
            skill_to_projects_map = defaultdict(list)
            projects = Project.objects.prefetch_related('technologies', 'name')
            for project in projects:
                project_name = getattr(project.name, language_key)
                for tech in project.technologies.all():
                    skill_to_projects_map[tech.name].append(project_name)

            ## STEP 6: Serialize the data, passing the context
            # The context will be automatically passed down to the nested SkillSerializer
            context = {
                'request': request,
                'skill_to_projects_map': skill_to_projects_map
            }
            company_data = CompanySerializer(company, context=context).data

            ## STEP 7: Assemble the final, clean response
            response_data = {
                "titles": titles,
                "skills": company_data.get('skills', []), # Get skills from the serializer
                "other_data": {
                    'company_name': company_data.get('name'),
                    'color': company_data.get('company_color'),
                }
            }

            return Response({"language": language, "data": response_data}, status=status.HTTP_200_OK)

        except Company.DoesNotExist:
            # This error handling part is fine, no changes needed
            # ... your existing code for 404 response ...
            return Response({"error": "Company not found"}, status=status.HTTP_404_NOT_FOUND)