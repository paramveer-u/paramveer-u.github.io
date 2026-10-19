# Kartly – React + Java (Spring Boot) + MySQL

## 1. Database
MySQL must be running locally. The `shopdb` database and `users` table are created automatically.
Set your password in `backend/src/main/resources/application.properties`.

## 2. Backend (Java 17+, Maven)
    cd backend
    mvn spring-boot:run        # http://localhost:8080

## 3. Frontend (Node 18+)
    cd frontend
    npm install
    npm run dev                # http://localhost:5173

Flow: /register -> /login -> / (home). Passwords are stored as BCrypt hashes.
