# 🎬 MovieHub Frontend Docker Image

> 🇺🇦 Read this in [Ukrainian](README_UA.md)

This is a frontend application for browsing and managing movies, built with **React + Vite** and served via **Nginx**.

---

## 🚀 Quick Start

### ⚙️ Requirements

- [Docker](https://www.docker.com/) installed

---

### 1. Run the Backend

```bash
docker pull webbylabhub/movies
docker run --name movies-back -p 8000:8000 webbylabhub/movies
```

> **Note:** Make sure the backend is available at `http://localhost:8000/api/v1`, as the frontend will send requests to this address.

---

### 2. Run the Frontend

```bash
docker pull alexhavier/movies
docker run --name movies -p 3000:3000 -e API_URL=http://localhost:8000/api/v1 alexhavier/movies
```

---

### 3. Open the App

After launching both the backend and frontend, open your browser and go to:  
👉 [http://localhost:3000/signup](http://localhost:3000/signup)

Register a new user. You can use your own data or the following example:

```json
{
  "email": "petro@gmail.com",
  "name": "Petrov Petro",
  "password": "super-password",
  "confirmPassword": "super-password"
}
```

---

## 📦 Features

1. ➕ Add a movie  
2. 🗑️ Delete a movie  
3. ✏️ View and edit movie details  
4. 📊 List movies with sorting by title or release year  
5. 🔍 Search for a movie by title  
6. 🎭 Search for a movie by actor name  
7. 📁 Import movies from a `.txt` file via the web interface (`sample_movies.txt` provided)

> 📄 Sample import file:  
> [sample_movies.txt (Gist)](https://gist.github.com/k0stik/3028d42973544dd61c3b4ad863378cad)

---

## 📘 API

- 🔧 Backend server is available as a Docker image:  
  [webbylabhub/movies (Docker Hub)](https://hub.docker.com/r/webbylabhub/movies)

- 📑 API Documentation:  
  [Postman Collection](https://documenter.getpostman.com/view/356840/TzkyLeVK)

---

## 🔁 Alternative Setup (from source)

```bash
git clone https://github.com/oleksiy-tverdokhlib/moviehub
cd moviehub

docker build -t alexhavier/movies --build-arg API_URL=http://localhost:8000/api/v1 .

docker run --name movies -p 3000:3000 -e API_URL=http://localhost:8000/api/v1 alexhavier/movies
```

> ⚠️ **Important:** Make sure to include the dot `.` at the end of the `docker build` command — it tells Docker to build from the current directory.

---

## 🧑‍💻 Author

**Oleksiy Tverdokhlib**  
[GitHub Profile](https://github.com/oleksiy-tverdokhlib)
