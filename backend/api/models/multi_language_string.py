from django.db import models

class MultiLanguageString(models.Model):
    """
    Model to handle multi-language strings.
    """
    title: str = models.CharField(max_length=255, verbose_name="Title")
    english: str = models.CharField(max_length=255, verbose_name="English")
    polish: str = models.CharField(max_length=255, verbose_name="Polish")
    ukrainian: str = models.CharField(max_length=255, verbose_name="Ukrainian")

    def __str__(self):
        return f"--- {self.title} ---\nEN: {self.english}\nPL: {self.polish}\nUA: {self.ukrainian}"

