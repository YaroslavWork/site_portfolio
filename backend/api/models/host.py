from django.db import models

class Host(models.Model):
    """
    Represents a host in the system.
    """

    name = models.CharField(max_length=255, unique=True)
    icon_path = models.CharField(max_length=255, blank=True, null=True)

    def __str__(self):
        return self.name