from django.db import models

from . import MultiLanguageString

class Hobby(models.Model):
    """
    Model to handle hobbies.
    """
    name: str = models.ForeignKey(
        MultiLanguageString,
        on_delete=models.CASCADE,
        related_name='hobbies_name',
        help_text="The translatable name of the hobby"
    )
    description: str = models.ForeignKey(
        MultiLanguageString,
        on_delete=models.CASCADE,
        related_name='hobbies_description',
        help_text="The translatable description of the hobby"
    )
    images_path: str = models.TextField(
        max_length=255,
        verbose_name="Images Path",
        help_text="Path to the images (divide image path by semicolon ';')",
        blank=True,
        null=True
    )

    def __str__(self):
        return f"{self.name}: {self.description}"