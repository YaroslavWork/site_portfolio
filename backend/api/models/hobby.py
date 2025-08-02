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
    icon_path: str = models.CharField(
        max_length=255,
        verbose_name="Icon Path",
        help_text="Path to the icon representing the hobby",
        blank=True,
        null=True
    )

    def __str__(self):
        return f"{self.name}: {self.description}"