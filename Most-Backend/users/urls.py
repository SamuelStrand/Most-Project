from django.urls import path
from . import views  # импортируем модуль views

urlpatterns = [
    path('register/', views.register_view, name='register'),
    path('me/', views.profile_view, name='profile'),
    path('login/', views.email_login_view, name='login'),
]
