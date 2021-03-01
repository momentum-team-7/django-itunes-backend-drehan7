from django.db import models
from django.contrib.auth.models import AbstractUser


class User(AbstractUser):
    pass


class Recent(models.Model):
    song_name = models.CharField(max_length=50)
    artist = models.CharField(max_length=50)

    def __str__(self):
        return f"{self.artist} | {self.song_name}"
