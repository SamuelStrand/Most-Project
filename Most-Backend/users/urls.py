from django.urls import path
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView

from . import views


urlpatterns = [
    path('register/', views.views.register_view, name='register'),
    path('me/', views.views.profile_view, name='profile'),
    path('token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('vacancies/', views.vacancy_list, name='vacancy_list'),
    path('vacancies/<int:pk>/', views.vacancy_detail, name='vacancy_detail'),
    path('login/', views.email_login_view, name='login'),
]
