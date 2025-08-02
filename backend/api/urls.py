from django.urls import path
from .views.home import HomeView
from .views.about_me import AboutMeView

urlpatterns = [
    path('home/', HomeView.as_view(), name='home'),
    path('about_me/', AboutMeView.as_view(), name='about_me'),
]