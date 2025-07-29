from django.db import models

from . import MultiLanguageString

class Work(models.Model):
    """
    Model to handle works.
    """
    title: str = models.ForeignKey(
        MultiLanguageString,
        on_delete=models.CASCADE,
        related_name='works',
        help_text="The translatable title of the work"
    )
    company: str = models.CharField(max_length=255, verbose_name="Company")
    place: str = models.CharField(max_length=255, verbose_name="Place")
    start_date = models.DateField(verbose_name="Start Date", null=True)
    end_date = models.DateField(verbose_name="End Date", null=True, blank=True)
    skills: list[MultiLanguageString] = models.ManyToManyField(
        MultiLanguageString,
        related_name='works_skills',
        help_text="The translatable skills used in the work"
    )
    is_IT: bool = models.BooleanField(
        default=False,
        verbose_name="Is IT",
        help_text="Indicates if the work is in the IT field"
    )