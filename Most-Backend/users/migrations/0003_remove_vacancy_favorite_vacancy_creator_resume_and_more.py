
import django.db.models.deletion
from django.conf import settings
from django.db import migrations, models


def set_default_creator(apps, schema_editor):
    Vacancy = apps.get_model('users', 'Vacancy')
    User = apps.get_model(settings.AUTH_USER_MODEL)
    
    first_user = User.objects.order_by('id').first()
    if first_user:
        Vacancy.objects.update(creator=first_user)


class Migration(migrations.Migration):

    dependencies = [
        ('users', '0002_vacancy'),
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.RemoveField(
            model_name='vacancy',
            name='favorite',
        ),
        migrations.AddField(
            model_name='vacancy',
            name='creator',
            field=models.ForeignKey(
                on_delete=django.db.models.deletion.CASCADE,
                related_name='vacancies',
                to=settings.AUTH_USER_MODEL,
                null=True
            ),
        ),
        migrations.RunPython(set_default_creator),
        migrations.AlterField(
            model_name='vacancy',
            name='creator',
            field=models.ForeignKey(
                on_delete=django.db.models.deletion.CASCADE,
                related_name='vacancies',
                to=settings.AUTH_USER_MODEL
            ),
        ),
        migrations.CreateModel(
            name='Resume',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('title', models.CharField(max_length=255)),
                ('summary', models.TextField()),
                ('experience', models.TextField(blank=True)),
                ('education', models.TextField(blank=True)),
                ('updated_at', models.DateTimeField(auto_now=True)),
                ('user', models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, related_name='resume', to=settings.AUTH_USER_MODEL)),
            ],
        ),
        migrations.CreateModel(
            name='Application',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('applied_at', models.DateTimeField(auto_now_add=True)),
                ('user', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='applications', to=settings.AUTH_USER_MODEL)),
                ('vacancy', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='applications', to='users.vacancy')),
            ],
            options={
                'unique_together': {('user', 'vacancy')},
            },
        ),
        migrations.CreateModel(
            name='Favorite',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('user', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='favorites', to=settings.AUTH_USER_MODEL)),
                ('vacancy', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='favorites', to='users.vacancy')),
            ],
            options={
                'unique_together': {('user', 'vacancy')},
            },
        ),
    ]