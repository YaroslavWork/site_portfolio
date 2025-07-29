from django.db import models

from .multi_language_string import MultiLanguageString
from .reference import Reference
from .technology import Technology

class Project(models.Model):
    """
    Model to handle projects.
    """
    name: str = models.ForeignKey(
        MultiLanguageString,
        on_delete=models.CASCADE,
        related_name='projects',
        help_text="The translatable name of the project"
    )
    technologies: list[Technology] = models.ManyToManyField(
        Technology,
        related_name='projects_technologies',
        help_text="The translatable technologies used in the project"
    )
    description: str = models.ForeignKey(
        MultiLanguageString,
        on_delete=models.CASCADE,
        related_name='projects_description',
        help_text="The translatable description of the project"
    )
    references: list[Reference] = models.ManyToManyField(
        Reference,
        related_name='projects_references',
        help_text="References related to the project"
    )
    
    def __str__(self):
        return f"{self.name}: {', '.join(str(tech) for tech in self.technologies.all())} - {self.description}"