# views.py

from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework.views import APIView

from .models import Vacancy, Application, Favorite, Resume
from .serializers import (
    RegisterSerializer,
    VacancySerializer,
    EmailTokenObtainPairSerializer,
    LogoutSerializer,
    ApplicationSerializer,
    ApplicationCreateSerializer,
    FavoriteSerializer,
    ResumeSerializer,
)


@api_view(['POST'])
def register_view(request):
    serializer = RegisterSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response({'message': 'User registered'}, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def profile_view(request):
    user = request.user
    return Response({
        "username": user.username,
        "email": user.email,
        "is_verified": user.is_verified
    })


@api_view(['GET', 'POST'])
@permission_classes([IsAuthenticated])
def vacancy_list(request):
    if request.method == 'GET':
        vacancies = Vacancy.objects.all()
        serializer = VacancySerializer(vacancies, many=True)
        
        return Response(serializer.data)

    serializer = VacancySerializer(data=request.data)
    if serializer.is_valid():
        serializer.save(creator=request.user)
        return Response(serializer.data, status=status.HTTP_201_CREATED)

    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET', 'PUT', 'DELETE'])
def vacancy_detail(request, pk):
    try:
        vacancy = Vacancy.objects.get(pk=pk)
    except Vacancy.DoesNotExist:
        return Response({'error': 'Vacancy not found'}, status=status.HTTP_404_NOT_FOUND)

    if request.method == 'GET':
        serializer = VacancySerializer(vacancy)
        return Response(serializer.data)
    if request.method == 'PUT':
        serializer = VacancySerializer(vacancy, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    vacancy.delete()
    return Response(status=status.HTTP_204_NO_CONTENT)


@api_view(['POST'])
def email_login_view(request):
    serializer = EmailTokenObtainPairSerializer(data=request.data, context={'request': request})
    if serializer.is_valid():
        return Response(serializer.validated_data, status=status.HTTP_200_OK)
    return Response(serializer.errors, status=status.HTTP_401_UNAUTHORIZED)


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def logout_view(request):
    serializer = LogoutSerializer(data=request.data)
    serializer.is_valid(raise_exception=True)
    RefreshToken(serializer.validated_data['refresh']).blacklist()
    return Response(status=status.HTTP_204_NO_CONTENT)


class ApplicationListCreateAPIView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        qs = Application.objects.filter(user=request.user)
        ser = ApplicationSerializer(qs, many=True)
        return Response(ser.data)

    def post(self, request):
        ser = ApplicationCreateSerializer(data=request.data, context={'request': request})
        if ser.is_valid():
            app = ser.save()
            return Response(ApplicationSerializer(app).data, status=status.HTTP_201_CREATED)
        return Response(ser.errors, status=status.HTTP_400_BAD_REQUEST)


class ApplicationDetailAPIView(APIView):
    permission_classes = [IsAuthenticated]

    def delete(self, request, pk):
        try:
            app = Application.objects.get(pk=pk, user=request.user)
        except Application.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)
        app.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)


class FavoriteListCreateAPIView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        qs = Favorite.objects.filter(user=request.user)
        ser = FavoriteSerializer(qs, many=True)
        return Response(ser.data)

    def post(self, request):
        ser = FavoriteSerializer(data=request.data)
        if ser.is_valid():
            ser.save(user=request.user)
            return Response(ser.data, status=status.HTTP_201_CREATED)
        return Response(ser.errors, status=status.HTTP_400_BAD_REQUEST)


class FavoriteDetailAPIView(APIView):
    permission_classes = [IsAuthenticated]

    def delete(self, request, pk):
        try:
            fav = Favorite.objects.get(pk=pk, user=request.user)
        except Favorite.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)
        fav.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)


class ResumeListCreateAPIView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        try:
            res = request.user.resume
        except Resume.DoesNotExist:
            return Response([], status=status.HTTP_200_OK)
        ser = ResumeSerializer(res)
        return Response([ser.data])

    def post(self, request):
        if hasattr(request.user, 'resume'):
            return Response({'detail': 'Resume already exists'}, status=status.HTTP_400_BAD_REQUEST)
        ser = ResumeSerializer(data=request.data)
        if ser.is_valid():
            ser.save(user=request.user)
            return Response(ser.data, status=status.HTTP_201_CREATED)
        return Response(ser.errors, status=status.HTTP_400_BAD_REQUEST)


class ResumeDetailAPIView(APIView):
    permission_classes = [IsAuthenticated]

    def put(self, request, pk):
        try:
            res = Resume.objects.get(pk=pk, user=request.user)
        except Resume.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)
        ser = ResumeSerializer(res, data=request.data)
        if ser.is_valid():
            ser.save()
            return Response(ser.data)
        return Response(ser.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, pk):
        try:
            res = Resume.objects.get(pk=pk, user=request.user)
        except Resume.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)
        res.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
