import os
import django
import random
from faker import Faker # type: ignore

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'mostback.settings')
django.setup()

from users.models import Vacancy, CustomUser  # замени на свои названия

fake = Faker()

def create_vacancies(n=10):
    creator = random.choice(CustomUser.objects.all())

    for _ in range(n):
        vacancy = Vacancy.objects.create(
            creator=creator,
            name=fake.job(),
            salary=f"{random.randint(100000, 800000)} KZT",
            payments=random.choice(["еженедельно", "ежемесячно", "по договору"]),
            workexp=random.choice(["без опыта", "от 1 года", "от 3 лет"]),
            schedule=random.randint(1, 5),
            whours=random.randint(20, 40),
            wformat=random.choice(["офлайн", "онлайн", "гибрид"]),
            imageUrl=fake.image_url()
        )
        print(f"Создана вакансия: {vacancy.name}")

create_vacancies(20)
