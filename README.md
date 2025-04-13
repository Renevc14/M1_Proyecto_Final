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
```
### 2. Ejecutar el backend
```bash
cd backend
npm install
npm run start
```
🔐 Asegúrate de tener configurado tu archivo .env con las variables necesarias como:
JWT_SECRET

JWT_EXPIRATION

FRONTEND_ENDPOINT

DATABASE_URL o configuración de conexión

### 3. Ejecutar el frontend
```bash
cd ../frontend
npm install
npm run dev
```
📍 El frontend corre por defecto en: http://localhost:5173

📝 Funcionalidades principales
✅ Registro y login con autenticación JWT

✅ CRUD completo de tareas

✅ Estados de tarea: PENDING, IN_PROGRESS, COMPLETED

✅ Protección de rutas mediante token

✅ Diseño responsivo con modo oscuro

---

## 📡 API - Endpoints principales

| Método | Endpoint             | Descripción                         | Autenticación |
|--------|----------------------|-------------------------------------|---------------|
| POST   | `/api/auth/register` | Registro de nuevo usuario           | ❌ No         |
| POST   | `/api/auth/login`    | Login de usuario                    | ❌ No         |
| GET    | `/api/user`          | Obtener datos del usuario logueado  | ✅ Sí         |
| GET    | `/api/tasks`         | Obtener todas las tareas del usuario| ✅ Sí         |
| GET    | `/api/tasks/:id`     | Obtener una tarea por ID            | ✅ Sí         |
| POST   | `/api/tasks`         | Crear nueva tarea                   | ✅ Sí         |
| PUT    | `/api/tasks/:id`     | Actualizar tarea                    | ✅ Sí         |
| DELETE | `/api/tasks/:id`     | Eliminar tarea (solo si completada) | ✅ Sí         |

> 🔐 Las rutas con autenticación requieren un token JWT en el header:  
> `Authorization: Bearer <token>`