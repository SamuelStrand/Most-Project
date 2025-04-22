Отлично! Ниже — **полная документация API** для твоего проекта на Django, с регистрацией, авторизацией по email, JWT-токенами и профилем пользователя. Подходит для интеграции с Angular или Postman.

---

# 📘 API Документация

## 🧾 Общая информация

- **Бэкенд**: Django + Django REST Framework + SimpleJWT
- **Формат запросов/ответов**: JSON
- **Аутентификация**: JWT (токены передаются в заголовке `Authorization`)

---

## 📌 Базовый URL

```
http://localhost:8000/api/users/
```

---

## 📝 1. Регистрация пользователя

**POST** `/register/`

### 🔸 Описание:

Создаёт нового пользователя

### 🔸 Тело запроса:

```json
{
  "username": "testuser",
  "email": "test@example.com",
  "password": "TestPass123"
}
```

### 🔸 Ответ:

```json
{
  "message": "User registered"
}
```

---

## 🔐 2. Авторизация (логин по email)

**POST** `/login/`

### 🔸 Описание:

Авторизация по email и паролю. Возвращает JWT-токены.

### 🔸 Тело запроса:

```json
{
  "email": "test@example.com",
  "password": "TestPass123"
}
```

### 🔸 Ответ:

```json
{
  "refresh": "eyJ0eXAiOiJKV1QiLCJhbGci...",
  "access": "eyJ0eXAiOiJKV1QiLCJhbGci...",
  "email": "test@example.com",
  "username": "testuser"
}
```

---

## 🔄 3. Обновление access токена

**POST** `/token/refresh/`

### 🔸 Описание:

Обновляет access-токен, используя refresh-токен.

### 🔸 Тело запроса:

```json
{
  "refresh": "your-refresh-token"
}
```

### 🔸 Ответ:

```json
{
  "access": "new-access-token"
}
```

---

## 🙋‍♂️ 4. Получение профиля пользователя

**GET** `/me/`

### 🔸 Описание:

Возвращает текущего авторизованного пользователя.

### 🔸 Заголовки:

```http
Authorization: Bearer your-access-token
```

### 🔸 Ответ:

```json
{
  "username": "testuser",
  "email": "test@example.com",
  "is_verified": false
}
```

---

## 🔒 Требования к авторизованным маршрутам

Маршруты, такие как `/me/`, требуют **JWT access-токен** в заголовке:

```
Authorization: Bearer <access_token>
```

---

## ❌ Возможные ошибки

| Статус | Причина              | Пример ответа                                 |
| ------ | -------------------- | --------------------------------------------- |
| 400    | Ошибка валидации     | `{ "email": ["Already exists"] }`             |
| 401    | Неверный логин/токен | `{ "detail": "Неверный email или пароль" }`   |
| 403    | Нет прав             | `{ "detail": "Учетные данные не переданы." }` |

---

## 🛠 Пример последовательности запросов

1. `POST /register/` — зарегистрировать пользователя
2. `POST /login/` — получить `access` и `refresh` токены
3. `GET /me/` — получить профиль пользователя
4. `POST /token/refresh/` — обновить access токен по `refresh`

---

## ✅ Готово!

Если хочешь — могу экспортировать в Postman или добавить OpenAPI (Swagger / ReDoc) для авто-документации.
