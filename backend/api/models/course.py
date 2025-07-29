from django.db import models

from . import MultiLanguageString

class Course(models.Model):
    """
    Model to handle courses.
    """
    title: str = models.ForeignKey(
        MultiLanguageString,
        on_delete=models.CASCADE,
        related_name='courses',
        help_text="The translatable title of the course"
    )
    description: str = models.ForeignKey(
        MultiLanguageString,
        on_delete=models.CASCADE,
        related_name='courses_description',
        help_text="The translatable description of the course"
    )
    company: str = models.CharField(
        max_length=255,
        verbose_name="Company",
        help_text="The company offering the course"
    )
    start_date = models.DateField(verbose_name="Start Date", null=True, blank=True)
    end_date = models.DateField(verbose_name="End Date", null=True, blank=True)

    def __str__(self):
        return f"{self.title} by {self.company} ({self.start_date} to {self.end_date})"