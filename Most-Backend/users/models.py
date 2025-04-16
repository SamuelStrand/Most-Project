from django.contrib.auth.models import AbstractUser
from django.db import models

class CustomUser(AbstractUser):
    email = models.EmailField(unique=True)
    phone = models.CharField(max_length=20, blank=True, null=True)
    age = models.PositiveIntegerField(blank=True, null=True)
    is_verified = models.BooleanField(default=False)

    def __str__(self):
        return self.username


class Vacancy(models.Model):
    name = models.CharField(max_length=255)
    salary = models.CharField(max_length=100)
    payments = models.CharField(max_length=100)
    workexp = models.CharField(max_length=100)
    schedule = models.IntegerField()
    whours = models.IntegerField()
    favorite = models.BooleanField(default=False)
    imageUrl = models.URLField(max_length=255)
    wformat = models.CharField(max_length=100)

    def __str__(self):
        return self.name