# 🎬 MovieHub Frontend Docker Image

> 🇬🇧 Read this in [English](README.md)

Це фронтенд-застосунок для перегляду та керування фільмами, створений з використанням **ReactTS + Redux Toolkit + Vite** та розгорнутий через **Nginx**.

---

## 🚀 Швидкий старт

### ⚙️ Вимоги

- Встановлений [Docker](https://www.docker.com/)

---

### 1. Запуск бекенда

Відкрийте термінал (або Docker UI) і по черзі виконайте наступні команди **в окремому вікні**:

```bash
docker pull webbylabhub/movies
docker run --name movies-back -p 8000:8000 webbylabhub/movies
```

> ⚠️ **Не закривайте** термінал після запуску бекенда — залиште його відкритим.

> **Примітка:** Переконайтесь, що бекенд доступний за адресою `http://localhost:8000/api/v1`, оскільки фронтенд надсилатиме запити саме туди.

---

### 2. Запуск фронтенда

Відкрийте **нове вікно термінала** (або Docker UI) та виконайте:

```bash
docker pull alexhavier/movies
docker run --name movies -p 3000:3000 -e API_URL=http://localhost:8000/api/v1 alexhavier/movies
```

> ⚠️ Знову ж таки, **не закривайте** термінал після запуску контейнера.

---

### 3. Відкрийте застосунок

Після запуску і бекенда, і фронтенда, відкрийте браузер і перейдіть за адресою:  
👉 [http://localhost:3000/signup](http://localhost:3000/signup)

Зареєструйте нового користувача. Ви можете використати власні дані або приклад:

```json
{
  "email": "petro@gmail.com",
  "name": "Petrov Petro",
  "password": "super-password",
  "confirmPassword": "super-password"
}
```

---

## 📦 Можливості

1. ➕ Додавання фільму  
2. 🗑️ Видалення фільму  
3. ✏️ Перегляд і редагування даних про фільм  
4. 📊 Список фільмів з сортуванням за назвою або роком випуску  
5. 🔍 Пошук фільму за назвою  
6. 🎭 Пошук фільму за ім’ям актора  
7. 📁 Імпорт фільмів із файлу `.txt` через веб-інтерфейс (`sample_movies.txt` надано)

> 📄 Зразок файлу для імпорту:  
> [sample_movies.txt (Gist)](https://gist.github.com/k0stik/3028d42973544dd61c3b4ad863378cad)

---

## 📘 API

- 🔧 Бекенд-сервер доступний як Docker-образ:  
  [webbylabhub/movies (Docker Hub)](https://hub.docker.com/r/webbylabhub/movies)

- 📑 Документація API:  
  [Postman Collection](https://documenter.getpostman.com/view/356840/TzkyLeVK)

---

## 🔁 Альтернативне налаштування (зі збереженням коду)

### 1. Запуск бекенда

Відкрийте термінал (або Docker UI) і виконайте:

```bash
docker pull webbylabhub/movies
docker run --name movies-back -p 8000:8000 webbylabhub/movies
```

> ⚠️ Не закривайте термінал після запуску сервера.

---

### 2. Клонування та запуск фронтенда

У терміналі або в IDE виконайте:

```bash
git clone https://github.com/oleksiy-tverdokhlib/moviehub
cd moviehub
npm install
npm run dev
```

Відкрийте локальний сервер розробки у браузері. Посилання з’явиться в терміналі (наприклад: [http://localhost:5173](http://localhost:5173)).

---

## 🧑‍💻 Автор

**Олексій Твердохліб**  
[Профіль GitHub](https://github.com/oleksiy-tverdokhlib)
