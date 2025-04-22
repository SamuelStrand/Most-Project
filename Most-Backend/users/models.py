from django.conf import settings
from django.contrib.auth.models import AbstractUser
from django.db import models


class CustomUser(AbstractUser):
    email = models.EmailField(unique=True)
    phone = models.CharField(max_length=20, blank=True, null=True)
    age = models.PositiveIntegerField(blank=True, null=True)
    is_verified = models.BooleanField(default=False)

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['username']

    def __str__(self):
        return self.email


class Vacancy(models.Model):
    creator = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        related_name='vacancies',
    )
    name = models.CharField(max_length=255)
    salary = models.CharField(max_length=100)
    payments = models.CharField(max_length=100)
    workexp = models.CharField(max_length=100)
    schedule = models.IntegerField()
    whours = models.IntegerField()
    wformat = models.CharField(max_length=100)
    imageUrl = models.URLField(max_length=255)

    def __str__(self):
        return self.name


class Application(models.Model):
    user = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        related_name='applications'
    )
    vacancy = models.ForeignKey(
        Vacancy,
        on_delete=models.CASCADE,
        related_name='applications'
    )
    applied_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        unique_together = ('user', 'vacancy')

    def __str__(self):
        return f'{self.user.email} → {self.vacancy.name}'


class Favorite(models.Model):
    user = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        related_name='favorites'
    )
    vacancy = models.ForeignKey(
        Vacancy,
        on_delete=models.CASCADE,
        related_name='favorites'
    )
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        unique_together = ('user', 'vacancy')

    def __str__(self):
        return f'{self.user.email} ★ {self.vacancy.name}'


class Resume(models.Model):
    user = models.OneToOneField(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        related_name='resume'
    )
    title = models.CharField(max_length=255)
    summary = models.TextField()
    experience = models.TextField(blank=True)
    education = models.TextField(blank=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f'Resume of {self.user.email}'
