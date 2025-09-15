from django.db import models

from .multi_language_string import MultiLanguageString


class TechnologyType(models.Model):
    """
    Model to handle types of technologies.
    """
    title: str = models.CharField(
        max_length=255,
        verbose_name="Title",
        help_text="The title of the technology type, e.g., programming language, framework, etc."
    )
    name: str = models.ForeignKey(
        MultiLanguageString,
        on_delete=models.CASCADE,
        related_name='technology_types',
        help_text="The translatable name of the technology type"
    )
    hue_color: str = models.CharField(
        max_length=255,
        verbose_name="Hue Color",
        help_text="The color from HSL palette. Must be between 0 and 360"
    )

    def __str__(self):
        return f"{self.title} {self.name} ({self.hue_color})"