from django.db import models

from . import MultiLanguageString

class BasicString(models.Model):
    """
    Model to handle basic strings.
    """
    title: str = models.CharField(max_length=255, verbose_name="Title")
    content: str = models.ForeignKey(
        MultiLanguageString,
        on_delete=models.CASCADE,
        related_name='basic_strings',
        help_text="The translatable content of the string"
    )


    def __str__(self):
        return f"{self.title}: {self.content}"