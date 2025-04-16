from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from .models import CustomUser, Vacancy


class CustomUserAdmin(UserAdmin):
    model = CustomUser
    list_display = ['username', 'email', 'is_staff', 'is_active']
    search_fields = ['username', 'email']
    ordering = ['id']


admin.site.register(CustomUser, CustomUserAdmin)


@admin.register(Vacancy)
class VacancyAdmin(admin.ModelAdmin):
    list_display = (
    'id', 'name', 'salary', 'payments', 'workexp', 'schedule', 'whours', 'favorite', 'imageUrl', 'wformat')
