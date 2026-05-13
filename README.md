# Week 12: BridgeKE - Authentication System

<p align="center">
  <img src="https://img.shields.io/badge/Node.js-v24.14.0-339933?style=for-the-badge&logo=nodedotjs&logoColor=white" alt="Node.js">
  <img src="https://img.shields.io/badge/Express.js-4.x-000000?style=for-the-badge&logo=express&logoColor=white" alt="Express">
  <img src="https://img.shields.io/badge/MongoDB-Atlas-47A248?style=for-the-badge&logo=mongodb&logoColor=white" alt="MongoDB">
  <img src="https://img.shields.io/badge/Mongoose-ODM-880000?style=for-the-badge&logo=mongoose&logoColor=white" alt="Mongoose">
  <img src="https://img.shields.io/badge/JWT-Authentication-000000?style=for-the-badge&logo=json-web-tokens&logoColor=white" alt="JWT">
  <img src="https://img.shields.io/badge/Bcrypt-Password_Hashing-FCD022?style=for-the-badge&logo=bcrypt&logoColor=black" alt="Bcrypt">
</p>

---

## Author
- **Name:** Mshi Dev15 & Team
- **GitHub:** [@Mshi-dev15](https://github.com/Mshi-dev15)
- **Date:** May 9, 2026
- **Program:** IYF Weekend Academy — Season 10

---

## 👥 Team & Contributions
This is a team project. See [CONTRIBUTORS.md](./CONTRIBUTORS.md) for full team member details, roles, and individual contributions.

---

## Project Description
BridgeKE is a full-stack MERN application connecting Kenyan youth with opportunities. This week we implemented a complete, secure authentication system with JWT tokens, password hashing, protected routes, and production deployment.

---

## 🔗 Live Demo

### Frontend
[![Frontend](https://img.shields.io/badge/_Frontend-bridgeke--frontend.vercel.app-blue?style=for-the-badge&logo=vercel&logoColor=white)](https://iyf-s10-week-12-mshi-dev15.vercel.app/)
![Status](https://img.shields.io/badge/Status-🟢_Live-success)

**Tech Stack:**
![React](https://img.shields.io/badge/React-18.x-61dafb?logo=react&style=flat-square)
![Vite](https://img.shields.io/badge/Vite-5.x-646cff?logo=vite&style=flat-square)


### Backend API
[![Backend](https://img.shields.io/badge/_API-bridgeke--api.onrender.com-ff6b6b?style=for-the-badge&logo=render&logoColor=white)](https://bridgeke-api.onrender.com/api/health)
![Status](https://img.shields.io/badge/Status-🟢_Online-brightgreen)

**Tech Stack:**
![Node.js](https://img.shields.io/badge/Node.js-20.x-339933?logo=node.js&style=flat-square)
![Express](https://img.shields.io/badge/Express-4.x-000000?logo=express&style=flat-square)
![MongoDB](https://img.shields.io/badge/MongoDB-Atlas-47A248?logo=mongodb&style=flat-square)

---

## Technologies Used
### Backend
- Node.js + Express.js
- MongoDB + Mongoose
- JWT (jsonwebtoken) for authentication
- bcryptjs for password hashing
- CORS, Helmet, express-rate-limit for security

### Frontend
- React + Vite
- Axios for API calls
- React Router for navigation
- Tailwind CSS for styling

### Deployment
- Render (Backend)
- Vercel (Frontend)
- MongoDB Atlas (Database)

---

## Features
✅ User registration with validation (username, email, password, profile)  
✅ Secure login with JWT token generation  
✅ Password hashing with bcrypt (never stored in plaintext)  
✅ Protected routes middleware (`protect`, `restrictTo`)  
✅ CORS configuration for cross-origin requests  
✅ Input validation with express-validator  
✅ Role-based access control (`youth`, `organization`, `admin`)  
✅ Geospatial indexing for Kenya location features 

---

## API Endpoints
- POST /api/auth/register → Register new user
- POST /api/auth/login → Login + receive JWT token
- GET /api/auth/me → Get current user (protected)
- PUT /api/auth/me → Update user profile (protected)
- GET /api/health → Health check endpoint

---

## How to Run Locally

### 1. Clone the repository
```bash
git clone https://github.com/Mshi-dev15/iyf-s10-week-12-Mshi-dev15.git
cd iyf-s10-week-12-Mshi-dev15
```

### 2. Setup Backend
```bash
cd backend
npm install
```

Create `.env` file with:
```env
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_super_secret_key_min_32_chars
FRONTEND_URL=http://localhost:5173
```

```bash
npm run dev  # Starts on http://localhost:3000
```

### 3. Setup Frontend (new terminal)
```bash
cd frontend
npm install
npm run dev  # Starts on http://localhost:5173
```

### 4. Test API
```bash
curl http://localhost:3000/api/health
```

---


## Lessons Learned
- **Git Merge Conflicts**: Learned systematic conflict resolution using `git checkout --theirs` and careful code review across 10+ files.
- **CORS Configuration**: Understood preflight requests, `OPTIONS` method, and dynamic origin validation for production.
- **Nested Data Structures**: Mapped flat API input to nested Mongoose schemas while maintaining backward compatibility.
- **Environment Management**: Secured secrets with `.env` files locally and platform env vars in production.
- **Full-Stack Debugging**: Used `curl` to isolate frontend vs backend issues before assuming CORS errors.

---

## Challenges Faced
| Challenge | Solution |
|-----------|----------|
| Merge conflicts in multiple files | Used `git checkout --theirs` for remote-approved code, verified each file manually |
| CORS errors in production | Added `'OPTIONS'` to CORS methods, fixed callback typo, set `FRONTEND_URL` env var |
| 404 errors on API routes | Updated Vercel `VITE_API_URL` env var to include `/api` prefix |
| Validator middleware field mismatch | Updated validators to handle nested `profile` structure; backend now validates all input at API boundary  |

---


> 🇰🇪 Built with ❤️ for Kenyan youth by the IYF Weekend Academy Season 10 cohort.