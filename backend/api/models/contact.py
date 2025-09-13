from django.db import models


class Contact(models.Model):
    """
    Model to handle contact information.
    """
    identification: str = models.CharField(
        max_length=255,
        verbose_name="Identification",
        help_text="The identification of the contact"
    )
    icon_name: str = models.CharField(
        max_length=255,
        blank=True,
        null=True,
        verbose_name="Icon Name",
        help_text="The icon name in react-icons library"
    )

    def __str__(self):
        return f"{self.identification} ({self.icon_name})"