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
    publication_date = models.DateField(verbose_name="Publication Date", null=True, blank=True)
    

    def __str__(self):
        return f"{self.title}: {self.content}"