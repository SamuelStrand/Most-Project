Конечно! Вот **полный список HTTP-запросов**, которые ты можешь выполнить через **Postman или Angular** для проверки функционала backend на Django с JWT:

---

## ✅ 1. Регистрация пользователя

### 📤 Метод: `POST`

### 📍 URL: `http://localhost:8000/api/users/register/`

**Body (JSON):**

```json
{
  "username": "testuser",
  "email": "test@example.com",
  "password": "TestPass123"
}
```

**Успешный ответ:**

```json
{
  "message": "User registered"
}
```

---

## ✅ 2. Авторизация (получение JWT токенов)

### 📤 Метод: `POST`

### 📍 URL: `http://localhost:8000/api/token/`

**Body (JSON):**

```json
{
  "username": "testuser",
  "password": "TestPass123"
}
```

**Ответ:**

```json
{
  "refresh": "eyJ0eXAiOiJKV1QiLCJhbGci...",
  "access": "eyJ0eXAiOiJKV1QiLCJhbGci..."
}
```

---

## 🔁 3. Обновление access-токена

### 📤 Метод: `POST`

### 📍 URL: `http://localhost:8000/api/token/refresh/`

**Body (JSON):**

```json
{
  "refresh": "your-refresh-token"
}
```

**Ответ:**

```json
{
  "access": "new-access-token"
}
```

---

## 🔒 4. Получение профиля (защищённый маршрут)

### 📥 Метод: `GET`

### 📍 URL: `http://localhost:8000/api/users/me/`

**Headers:**

```
Authorization: Bearer your-access-token
```

**Ответ:**

```json
{
  "username": "testuser",
  "email": "test@example.com",
  "is_verified": false
}
```

---

## 🚀 Быстрый тест в Postman

1. 📌 Зарегистрируйся
2. 🔐 Авторизуйся (получи токены)
3. ✅ Проверь `GET /me/` с `access token`
4. 🔁 Попробуй `POST /token/refresh/` при необходимости

---

Если хочешь, могу скинуть **Postman Collection (.json)** для всех этих запросов, чтобы ты импортировал и сразу проверил.
