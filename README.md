# 🎬 MovieHub Full-Stack Docker Image

> 🇺🇦 Read this in [Ukrainian](README_UA.md)

A **fully containerized full-stack movie app**, combining:
- **Frontend**: React (TypeScript) + Redux Toolkit + Vite (served with Nginx)
- **Backend**: Node.js API
- **Database**: MySQL 8.0.25

All services are bundled in **one Docker image** for simple, one-command deployment.

---

## 🚀 Quick Start

### ⚙️ Requirements

- [Docker](https://www.docker.com/) installed on your system

---

### ▶️ 1. Run the Application

Just run this command for pulling and **single comand** for runnig movies image:

```bash
docker pull alexhavier/movies

docker run --name movies -p 3000:3000 -e API_URL=http://localhost:3000/api/v1 alexhavier/movies
```

> ⚠️ **That’s it!** No need to start backend, frontend, or database separately.  
> The initialization may take up to 30–60 seconds.

The container will automatically:
- ✅ Start MySQL database
- ✅ Run migrations & seed the DB
- ✅ Launch the Node.js API
- ✅ Serve the frontend through Nginx

---

### 🌐 2. Open the App

Once initialized, open:  
👉 [http://localhost:3000/signup](http://localhost:3000/signup)

Create an account with your own data or use:

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

## 🔧 Advanced Usage

### 📦 Check Container Status

```bash
# List running containers
docker ps

# View logs
docker logs movies

# Stop the container
docker stop movies

# Remove the container
docker rm movies
```

---

## 🔁 Alternative Setup (from source)

### 1. Start the backend server

```bash
docker pull webbylabhub/movies
docker run --name movies-back -p 8000:8000 webbylabhub/movies
```

> ⚠️ Keep the terminal open after running the server.

---

### 2. Clone and run the frontend

```bash
git clone https://github.com/oleksiy-tverdokhlib/moviehub
cd moviehub
npm install
npm run dev
```

You can also create image out of front app. 

```bash
docker build -t alexhavier/movies --build-arg API_URL=http://localhost:8000/api/v1 .

docker run --name frontend -p 3000:3000 -e API_URL=http://localhost:8000/api/v1 alexhavier/movies
```
> ⚠️ Change alexhavier to your active docker account name.


Once initialized, open:
👉 http://localhost:3000/signup

---

## 🧑‍💻 Author

**Oleksiy Tverdokhlib**  
[GitHub Profile](https://github.com/oleksiy-tverdokhlib)
