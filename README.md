# 🧠 Task Manager FullStack

Este es un proyecto fullstack desarrollado con **Node.js + Express** en el backend y **React + Vite** en el frontend.  
Permite a los usuarios registrarse, iniciar sesión y gestionar sus tareas: crear, editar, listar, filtrar y eliminar tareas según su estado.

---

## 📦 Tecnologías utilizadas

- **Frontend**: React, Vite, Axios, React Router DOM, CSS Modules
- **Backend**: Node.js, Express, Sequelize, PostgreSQL, JWT, bcrypt
- **Base de datos**: PostgreSQL

---

## 🚀 ¿Cómo ejecutar el proyecto?

### 1. Clona el repositorio

```bash
git clone https://github.com/tu-usuario/M1_Proyecto_Final.git
cd M1_Proyecto_Final

---

## 🚀 ¿Cómo ejecutar el proyecto?

### 2. Ejecutar el backend

```bash
cd backend
npm install
npm run start

### 2. Ejecutar el backend

```bash
cd frontend
npm install
npm run dev

Nota: El frontend corre por defecto en http://localhost:5173
🔐 Asegúrate de tener configurado tu archivo .env con las variables necesarias como:

JWT_SECRET
JWT_EXPIRATION
FRONTEND_ENDPOINT

📝 Funcionalidades principales
✅ Registro y login con autenticación JWT

✅ CRUD completo de tareas

✅ Estados de tarea: PENDING, IN_PROGRESS, COMPLETED

✅ Protección de rutas mediante token

✅ Diseño responsivo con modo oscuro