from django.db import models

from . import MultiLanguageString

class Book(models.Model):
    """
    Model to handle books with multi-language titles.
    """

    author: str = models.CharField(max_length=255, verbose_name="Author")
    title: str = models.ForeignKey(
        MultiLanguageString,
        on_delete=models.CASCADE,
        related_name='books',
        help_text="The translatable title of the book"
    )
    progress: float = models.FloatField(
        default=0.0,
        verbose_name="Reading Progress",
        help_text="Progress of reading the book (0-1)"
    )
    publication_date = models.DateField(verbose_name="Publication Date", null=True, blank=True)
    

    def __str__(self):
        return f"{self.title}: {self.author} (Progress: {self.progress * 100}%)"