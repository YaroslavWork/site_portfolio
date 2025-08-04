from django.db import models

from . import MultiLanguageString, Technology

class Skill(models.Model):

    """
    Model to handle skills.
    """
    title: str = models.ForeignKey(
        Technology,
        on_delete=models.CASCADE,
        related_name='skills',
        help_text="The title of the skill, linked to a technology"
    )

    stuff_i_know: str = models.ForeignKey(
        MultiLanguageString,
        on_delete=models.CASCADE,
        related_name='skills_know',
        help_text="The translatable items I know related to the skill"
    )
    stuff_i_learn: str = models.ForeignKey(
        MultiLanguageString,
        on_delete=models.CASCADE,
        related_name='skills_learn',
        help_text="The translatable items I am learning related to the skill"
    )
    stuff_i_plan: str = models.ForeignKey(
        MultiLanguageString,
        on_delete=models.CASCADE,
        related_name='skills_plan',
        help_text="The translatable items I plan to learn related to the skill"
    )

    def __str__(self):
        return f"{self.title}: {self.stuff_i_know}, {self.stuff_i_learn}, {self.stuff_i_plan}"