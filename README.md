# SkillBridge — Online Learning Platform

> 🎓 An Internship Final Year Project — A full-stack, production-grade Online Learning Platform built with **Spring Boot** and **React**.

---

## 🌟 About

**SkillBridge** is a modern e-learning platform that allows students to browse courses, watch topic-specific video lessons, track their progress, and earn verified digital certificates upon completion.

Built as part of an **Internship Final Year Project** at Kolar, Karnataka, India.

---

## ✨ Key Features

| Feature | Description |
|---|---|
| 🔐 JWT Authentication | Secure login, signup, and token-based sessions |
| 📚 Course Catalog | Browse courses by category and difficulty level |
| 🎬 Topic-Specific Videos | Each lesson has its own relevant YouTube-embedded video |
| ✅ Progress Tracking | Mark lessons complete, track % progress per course |
| 🏆 Digital Certificates | Auto-generated with unique QR code for verification |
| 📝 Smart Notes | Take notes directly while watching lessons |
| ⏱️ Study Timer | Built-in 25-minute Pomodoro focus timer |
| 🤖 AI Chat Assistant | Floating support chatbot on every page |
| ⚡ Gamification | Learning Streak and Skill Points (XP) system |
| 🌗 Dark/Light Mode | Premium "Midnight Emerald" theme with Outfit typography |
| 👨‍💼 Admin Dashboard | Manage courses, users, and enrollments |
| 🌟 Course Reviews | Learner ratings and testimonials on course pages |

---

## 🛠️ Tech Stack

### Backend
- **Java 17** + **Spring Boot 3.2.5**
- **Spring Security** + **JWT** (JSON Web Tokens)
- **Spring Data JPA**
- **H2 In-Memory Database**
- **Maven**

### Frontend
- **React 19** + **Vite**
- **React Router** for navigation
- **Framer Motion** for animations
- **Axios** for API calls
- **React Icons** + **React Hot Toast**
- **jsPDF** for certificate generation

---

## 🚀 Getting Started

### Prerequisites
- Java JDK 17+
- Maven
- Node.js 18+

### 1. Clone the Repository
```bash
git clone https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git
cd YOUR_REPO_NAME/online-learning-platform
```

### 2. Start the Backend (Spring Boot)
```bash
cd backend
mvn spring-boot:run
```
Wait for: `Started OnlineLearningPlatformApplication on port 8081`

### 3. Start the Frontend (React/Vite)
Open a **new** terminal:
```bash
cd frontend
npm install
npm run dev
```

### 4. Open in Browser
👉 [http://localhost:5173](http://localhost:5173)

---

## 🔑 Demo Login Credentials

| Role | Email | Password |
|---|---|---|
| Student | `student@example.com` | `password` |
| Admin | `admin@example.com` | `admin123` |

> **Note:** This project uses an H2 in-memory database. Data resets when the backend is restarted. Simply log in again after each restart.

---

## 📁 Project Structure

```
online-learning-platform/
├── backend/                  # Spring Boot Application
│   ├── src/main/java/
│   │   └── com/example/onlinelearning/
│   │       ├── config/       # Security, CORS, DataLoader
│   │       ├── controller/   # REST API Controllers
│   │       ├── entity/       # JPA Entities
│   │       ├── repository/   # Spring Data Repositories
│   │       ├── service/      # Business Logic
│   │       └── security/     # JWT Filter & Utils
│   └── src/main/resources/
│       └── application.properties
│
└── frontend/                 # React + Vite Application
    ├── src/
    │   ├── components/       # Navbar, Footer, AI Assistant
    │   ├── pages/            # All page components
    │   ├── context/          # Auth Context
    │   ├── api/              # Axios configuration
    │   └── index.css         # Midnight Emerald theme
    └── index.html
```

---

## 📍 Developed By

**Pavan Kumar**  
Internship Final Year Project  
Kolar, Karnataka, India

---

## 📄 License

This project is for academic/educational purposes.
