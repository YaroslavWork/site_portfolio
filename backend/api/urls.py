from django.urls import path
from .views.home import HomeView
from .views.about_me import AboutMeView
from .views.skills import SkillsView
from .views.projects import ProjectsView
from .views.work_experience import WorkExperienceView
from .views.education import EducationView
from .views.contact import ContactView
from .views.company import CompanyView

urlpatterns = [
    path('home/', HomeView.as_view(), name='home'),
    path('about_me/', AboutMeView.as_view(), name='about_me'),
    path('skills/', SkillsView.as_view(), name='skills'),
    path('projects/', ProjectsView.as_view(), name='projects'),
    path('work_experience/', WorkExperienceView.as_view(), name='work_experience'),
    path('education/', EducationView.as_view(), name='education'),
    path('contact/', ContactView.as_view(), name='contact'),
    path('company/<str:company_code>/', CompanyView.as_view(), name='company'),
]