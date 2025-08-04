from django.db import models

from .multi_language_string import MultiLanguageString
from .technology_type import TechnologyType

class Technology(models.Model):
    """
    Model to handle technologies.
    """
    name: str = models.CharField(
        max_length=255,
        verbose_name="Name",
        help_text="The name of the technology"
    )
    technology_type: str = models.ForeignKey(
        TechnologyType,
        on_delete=models.CASCADE,
        related_name='Technologies',
        help_text="The type of the technology, e.g., programming language, framework, etc."
    )

    def __str__(self):
        return f"{self.name}: {self.technology_type.title}"