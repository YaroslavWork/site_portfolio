from django.db import models

class MultiLanguageString(models.Model):
    """
    Model to handle multi-language strings.
    """
    title: str = models.CharField(max_length=255, verbose_name="Title")
    # Unlimited length for English, Polish, and Ukrainian strings
    english: str = models.TextField(verbose_name="English", null=True, blank=True)
    polish: str = models.TextField(verbose_name="Polish", null=True, blank=True)
    ukrainian: str = models.TextField(verbose_name="Ukrainian", null=True, blank=True)
    
    def __str__(self):
        return f"--- {self.title} ---\nEN: {self.english}\nPL: {self.polish}\nUA: {self.ukrainian}"

