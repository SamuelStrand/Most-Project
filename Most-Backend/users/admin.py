from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from .models import CustomUser, Vacancy, Application, Favorite, Resume


@admin.register(CustomUser)
class CustomUserAdmin(UserAdmin):
    model = CustomUser
    list_display = (
        'id',
        'email',
        'username',
        'is_verified',
        'is_staff',
        'is_superuser',
    )
    list_filter = (
        'is_verified',
        'is_staff',
        'is_superuser',
    )
    search_fields = (
        'email',
        'username',
    )
    ordering = ('email',)
    fieldsets = (
        (None, {'fields': ('email', 'username', 'password')}),
        ('Personal info', {'fields': ('first_name', 'last_name', 'phone', 'age')}),
        ('Permissions',
         {'fields': ('is_verified', 'is_active', 'is_staff', 'is_superuser', 'groups', 'user_permissions')}),
        ('Important dates', {'fields': ('last_login', 'date_joined')}),
    )


@admin.register(Vacancy)
class VacancyAdmin(admin.ModelAdmin):
    list_display = (
        'id',
        'creator',
        'name',
        'salary',
        'payments',
        'workexp',
        'schedule',
        'whours',
        'wformat',
        # поле favorite убрано, отсутствует в модели
    )
    list_filter = (
        'creator',
        'schedule',
        'workexp',
    )
    search_fields = (
        'name',
        'payments',
        'wformat',
    )


@admin.register(Application)
class ApplicationAdmin(admin.ModelAdmin):
    list_display = (
        'id',
        'user',
        'vacancy',
        'applied_at',
    )
    list_filter = (
        'user',
        'vacancy',
    )
    search_fields = (
        'user__email',
        'vacancy__name',
    )


@admin.register(Favorite)
class FavoriteAdmin(admin.ModelAdmin):
    list_display = (
        'id',
        'user',
        'vacancy',
        'created_at',
    )
    list_filter = (
        'user',
        'vacancy',
    )
    search_fields = (
        'user__email',
        'vacancy__name',
    )


@admin.register(Resume)
class ResumeAdmin(admin.ModelAdmin):
    list_display = (
        'id',
        'user',
        'title',
        'updated_at',
    )
    list_filter = (
        'user',
        'updated_at',
    )
    search_fields = (
        'user__email',
        'title',
    )
