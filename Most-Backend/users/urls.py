# urls.py 
from django.urls import path
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView

from .views import (
    register_view,
    profile_view,
    vacancy_list,
    vacancy_detail,
    email_login_view,
    logout_view,
    ApplicationListCreateAPIView,
    ApplicationDetailAPIView,
    FavoriteListCreateAPIView,
    FavoriteDetailAPIView,
    ResumeListCreateAPIView,
    ResumeDetailAPIView,
)

urlpatterns = [
    path('register/',      register_view,                     name='register'),     path('login/',         email_login_view,                  name='login'),
    path('logout/',        logout_view,                       name='logout'),
    path('token/',         TokenObtainPairView.as_view(),     name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(),        name='token_refresh'),
    path('me/',            profile_view,                      name='profile'),
    
    path('vacancies/',          vacancy_list,        name='vacancy_list'),
    path('vacancies/<int:pk>/', vacancy_detail,      name='vacancy_detail'),
    
    path('applications/',        ApplicationListCreateAPIView.as_view(), name='application_list_create'),
    path('applications/<int:pk>/', ApplicationDetailAPIView.as_view(),    name='application_detail'),
    
    path('favorites/',       FavoriteListCreateAPIView.as_view(),      name='favorite_list_create'),
    path('favorites/<int:pk>/', FavoriteDetailAPIView.as_view(),        name='favorite_detail'),
    
    path('resumes/',         ResumeListCreateAPIView.as_view(),        name='resume_list_create'),
    path('resumes/<int:pk>/', ResumeDetailAPIView.as_view(),          name='resume_detail'),
    path('resumes/me/', ResumeListCreateAPIView.as_view(), name='my-resume'),
]