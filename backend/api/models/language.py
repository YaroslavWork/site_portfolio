from django.db import models

from .multi_language_string import MultiLanguageString

class Language(models.Model):
    """
    Represents a knowledge of language.
    """

    name: str = models.ForeignKey(
        MultiLanguageString,
        on_delete=models.CASCADE,
        related_name='language_name',
        help_text="The name of language"
    )
    knowledge = models.CharField(
        max_length=255,
        help_text="The knowledge of language"
    )

    def __str__(self):
        return f"{self.name} ({self.knowledge})"