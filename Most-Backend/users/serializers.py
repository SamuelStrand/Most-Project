from rest_framework import serializers
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from .models import CustomUser, Vacancy, Application, Favorite, Resume


class RegisterSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)

    class Meta:
        model = CustomUser
        fields = ('email', 'username', 'password', 'phone', 'age')

    def create(self, validated_data):
        user = CustomUser(
            email=validated_data['email'],
            username=validated_data['username'],
            phone=validated_data.get('phone'),
            age=validated_data.get('age')
        )
        user.set_password(validated_data['password'])
        user.save()
        return user


class EmailTokenObtainPairSerializer(TokenObtainPairSerializer):
    username_field = 'email'


class VacancySerializer(serializers.ModelSerializer):
    creator = serializers.ReadOnlyField(source='creator.id')

    class Meta:
        model = Vacancy
        fields = '__all__'

class LogoutSerializer(serializers.Serializer):
    refresh = serializers.CharField()


class ApplicationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Application
        fields = ('id', 'user', 'vacancy', 'applied_at')
        read_only_fields = ('id', 'user', 'applied_at')


class ApplicationCreateSerializer(serializers.Serializer):
    vacancy_id = serializers.IntegerField()

    def create(self, validated_data):
        user = self.context['request'].user
        vac = Vacancy.objects.get(pk=validated_data['vacancy_id'])
        return Application.objects.create(user=user, vacancy=vac)


class FavoriteSerializer(serializers.ModelSerializer):
    class Meta:
        model = Favorite
        fields = ('id', 'user', 'vacancy', 'created_at')
        read_only_fields = ('id', 'user', 'created_at')


class ResumeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Resume
        fields = ('id', 'title', 'summary', 'experience', 'education', 'updated_at')
        read_only_fields = ('id', 'updated_at')
