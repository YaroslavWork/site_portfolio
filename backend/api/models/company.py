from django.db import models
import random, string

from .skill import Skill


class Company(models.Model):
    """
    Model to handle company information.
    """
    code: str = models.CharField(
        max_length=6,
        unique=True,
        verbose_name="Company Code",
        help_text=f"Copy from this: {''.join(random.choice(string.ascii_uppercase + string.digits) for _ in range(6))}",
    )
    name: str = models.CharField(
        max_length=255,
        verbose_name="Company Name",
        help_text="The name of the company"
    )
    company_color: str = models.CharField(
        max_length=6,
        verbose_name="Primary Color",
        help_text="The primary color of the company in HEX format"
    )
    cv_path: str = models.CharField(
        max_length=255,
        blank=True,
        null=True,
        verbose_name="CV Path",
        help_text="The path to the my CV specially for company"
    )
    cover_letter_path: str = models.CharField(
        max_length=255,
        blank=True,
        null=True,
        verbose_name="Cover Letter Path",
        help_text="The path to the my cover letter specially for company"
    )
    skills: list[Skill] = models.ManyToManyField(
        Skill,
        blank=True,
        verbose_name="Skills",
        help_text="The skills associated with the company"
    )


    def __str__(self) -> str:
        return f"\"{self.name}\" - {self.code} (#{self.company_color})"