from django.urls import path
from .views.home import HomeView
from .views.about_me import AboutMeView
from .views.skills import SkillsView

urlpatterns = [
    path('home/', HomeView.as_view(), name='home'),
    path('about_me/', AboutMeView.as_view(), name='about_me'),
    path('skills/', SkillsView.as_view(), name='skills'),
]