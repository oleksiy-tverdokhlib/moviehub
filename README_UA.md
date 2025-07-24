# 🎬 MovieHub: Повноцінний Docker-образ для Full-Stack застосунку

> 🇬🇧 Read this in [English](README.md)

Це **повноцінний контейнеризований застосунок для роботи з фільмами**, що включає:
- **Фронтенд**: React (TypeScript) + Redux Toolkit + Vite (працює через Nginx)
- **Бекенд**: Node.js API
- **База даних**: MySQL 8.0.25

Усі сервіси об'єднані в **єдиний Docker-образ** для зручного запуску однією командою.

---

## 🚀 Швидкий старт

### ⚙️ Вимоги

- Встановлений [Docker](https://www.docker.com/)

---

### ▶️ 1. Запуск застосунку

Виконайте одну команду для завантаження та **одну команду** для запуску образу:

```bash
docker pull alexhavier/movies

docker run --name movies -p 3000:3000 -e API_URL=http://localhost:3000/api/v1 alexhavier/movies
```

> ⚠️ **І все!** Не потрібно окремо запускати фронтенд, бекенд або базу даних.  
> Ініціалізація може тривати 30–60 секунд.

Контейнер автоматично:
- ✅ Запускає базу даних MySQL
- ✅ Виконує міграції та початкове наповнення даними
- ✅ Запускає API на Node.js
- ✅ Подає фронтенд через Nginx

---

### 🌐 2. Відкрийте застосунок

Після запуску відкрийте:  
👉 [http://localhost:3000/signup](http://localhost:3000/signup)

Зареєструйтеся вручну або використайте приклад:

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
3. ✏️ Перегляд та редагування деталей фільму
4. 📊 Сортування списку фільмів за назвою або роком випуску
5. 🔍 Пошук фільму за назвою
6. 🎭 Пошук фільму за іменем актора
7. 📁 Імпорт фільмів з `.txt` файлу через веб-інтерфейс (`sample_movies.txt` додається)

> 📄 Приклад файлу для імпорту:  
> [sample_movies.txt (Gist)](https://gist.github.com/k0stik/3028d42973544dd61c3b4ad863378cad)

---

## 📘 API

- 🔧 Готовий Docker-образ з бекендом:  
  [webbylabhub/movies (Docker Hub)](https://hub.docker.com/r/webbylabhub/movies)

- 📑 Документація API:  
  [Postman Collection](https://documenter.getpostman.com/view/356840/TzkyLeVK)

---

## 🔧 Додаткові можливості

### 📦 Статус контейнера

```bash
# Переглянути активні контейнери
docker ps

# Переглянути логи
docker logs movies

# Зупинити контейнер
docker stop movies

# Видалити контейнер
docker rm movies
```

---

## 🔁 Альтернативне встановлення (з вихідного коду)

### 1. Запустити бекенд

```bash
docker pull webbylabhub/movies
docker run --name movies-back -p 8000:8000 webbylabhub/movies
```

> ⚠️ Тримайте термінал відкритим після запуску.

---

### 2. Клонувати та запустити фронтенд

```bash
git clone https://github.com/oleksiy-tverdokhlib/moviehub
cd moviehub
npm install
npm run dev
```

Також можна створити Docker-образ з фронтенду:

```bash
docker build -t alexhavier/movies --build-arg API_URL=http://localhost:8000/api/v1 .

docker run --name frontend -p 3000:3000 -e API_URL=http://localhost:8000/api/v1 alexhavier/movies
```

> ⚠️ Замініть `alexhavier` на ім’я вашого активного облікового запису в Docker.

Після запуску відкрийте:  
👉 [http://localhost:3000/signup](http://localhost:3000/signup)

---

## 🧑‍💻 Автор

**Олексій Твердохліб**  
[Профіль на GitHub](https://github.com/oleksiy-tverdokhlib)
