from django.db import models

from .multi_language_string import MultiLanguageString

class Technology(models.Model):
    """
    Model to handle technologies.
    """
    name: str = models.CharField(
        max_length=255,
        verbose_name="Name",
        help_text="The name of the technology"
    )
    structure: str = models.ForeignKey(
        MultiLanguageString,
        on_delete=models.CASCADE,
        related_name='technologies_structure',
        help_text="The translatable structure of the technology"
    )

    def __str__(self):
        return f"{self.name}: {self.structure}"