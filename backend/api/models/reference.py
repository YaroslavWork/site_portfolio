from django.db import models

class Reference(models.Model):
    """
    Model to handle references.
    """
    title: str = models.CharField(max_length=255, verbose_name="Title")
    host: str = models.CharField(max_length=255, verbose_name="Host")
    url: str = models.URLField(verbose_name="URL", help_text="The URL of the reference")

    def __str__(self):
        return f"{self.title} ({self.host}) - {self.url}"