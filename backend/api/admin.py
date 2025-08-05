from django.contrib import admin
from .models import MultiLanguageString, BasicString, Hobby, Technology, Skill, Project, Course, Reference, Education, Book, Work, TechnologyType, Host

# Register your models here.
admin.site.register(MultiLanguageString)
admin.site.register(BasicString)
admin.site.register(Hobby)
admin.site.register(Technology)
admin.site.register(TechnologyType)
admin.site.register(Skill)
admin.site.register(Project)
admin.site.register(Course)
admin.site.register(Reference)
admin.site.register(Education)
admin.site.register(Book)
admin.site.register(Work)
admin.site.register(Host)