from django.db import models

from .host import Host

class Reference(models.Model):
    """
    Model to handle references.
    """
    host = models.ForeignKey(
        Host,
        on_delete=models.CASCADE,
        related_name='references',
        help_text="The host of the reference"
    )
    url = models.URLField(verbose_name="URL", help_text="The URL of the reference")

    def __str__(self):
        return f"{self.title} ({self.host}) - {self.url}"