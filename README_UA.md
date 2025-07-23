# 🎬 MovieHub Frontend Docker Image
    
> 🇬🇧 Read this in [English](README.md)

Це фронтенд-застосунок для перегляду та управління фільмами, створений на основі **React + Vite** і розгорнутий за допомогою **Nginx**.

---

## 🚀 Швидкий старт

### ⚙️ Вимоги

- Встановлений [Docker](https://www.docker.com/)

---

### 1. Запуск бекенду

```bash
docker pull webbylabhub/movies
docker run --name movies-back -p 8000:8000 webbylabhub/movies
```

> **Примітка:** Переконайтесь, що бекенд доступний за адресою `http://localhost:8000/api/v1`, оскільки фронтенд буде звертатися саме до цього URL.

---

### 2. Запуск фронтенду

```bash
docker pull alexhavier/movies
docker run --name movies -p 3000:3000 -e API_URL=http://localhost:8000/api/v1 alexhavier/movies
```

---

### 3. Перехід до застосунку

Після запуску відкрийте у браузері:  
👉 [http://localhost:3000/signup](http://localhost:3000/signup)

Зареєструйте нового користувача. Можна використати довільні дані або скористатись прикладом:

```json
{
	"email": "petro@gmail.com",
	"name": "Petrov Petro",
	"password": "super-password",
	"confirmPassword": "super-password"
}
```

---

## 📦 Основні можливості

1. ➕ Додавання фільму
2. 🗑️ Видалення фільму
3. ✏️ Перегляд та редагування інформації про фільм
4. 📊 Відображення списку фільмів із сортуванням за назвою або роком
5. 🔍 Пошук фільму за назвою
6. 🎭 Пошук фільму за ім’ям актора
7. 📁 Імпорт фільмів з текстового файлу (`sample_movies.txt`) через веб-інтерфейс

> 📄 Приклад файлу для імпорту:  
> [sample_movies.txt (Gist)](https://gist.github.com/k0stik/3028d42973544dd61c3b4ad863378cad)

---

## 📘 API

- 🔧 Бекенд-сервер реалізовано у Docker-образі:  
  [webbylabhub/movies (Docker Hub)](https://hub.docker.com/r/webbylabhub/movies)

- 📑 Документація API:  
  [Postman Documentation](https://documenter.getpostman.com/view/356840/TzkyLeVK)

---

## 🔁 Альтернативний запуск (з вихідного коду)

```bash
git clone https://github.com/oleksiy-tverdokhlib/moviehub
cd moviehub

docker build -t alexhavier/movies --build-arg API_URL=http://localhost:8000/api/v1 .

docker run --name movies -p 3000:3000 -e API_URL=http://localhost:8000/api/v1 alexhavier/movies
```

> ⚠️ **Увага:** у команді `docker build` в кінці обов’язково має бути крапка `.` — вона вказує на поточну директорію з `Dockerfile`.

---

## 🧑‍💻 Автор

**Oleksiy Tverdokhlib**  
[GitHub профіль](https://github.com/oleksiy-tverdokhlib)
