from django.db import models

from . import MultiLanguageString

class Education(models.Model):
    """
    Model to handle education details.
    """
    institution: str = models.ForeignKey(
        MultiLanguageString,
        on_delete=models.CASCADE,
        related_name='educations_institution',
        help_text="The translatable name of the educational institution"
    )
    degree: str = models.ForeignKey(
        MultiLanguageString,
        on_delete=models.CASCADE,
        related_name='educations_degree',
        help_text="The translatable degree obtained",
        null=True,
    )
    field_of_study: str = models.ForeignKey(
        MultiLanguageString,
        on_delete=models.CASCADE,
        related_name='educations_field_of_study',
        help_text="The translatable field of study",
        null=True,
    )
    start_date: str = models.DateField(verbose_name="Start Date", help_text="The start date of the education")
    end_date: str = models.DateField(verbose_name="End Date", help_text="The end date of the education")

    def __str__(self):
        return f"{self.institution} - {self.degree} ({self.start_date} to {self.end_date})"