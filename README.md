# Week 12: BridgeKE - Authentication System

## Author
- **Name:** Mshi Dev15 & Team
- **GitHub:** [@Mshi-dev15](https://github.com/Mshi-dev15)
- **Date:** May 9, 2026
- **Program:** IYF Weekend Academy — Season 10

---

## Project Description
BridgeKE is a full-stack MERN application connecting Kenyan youth with opportunities. This week we implemented a complete, secure authentication system with JWT tokens, password hashing, protected routes, and production deployment.

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
git clone https://github.com/Mshi-dev15/iyf-s10-week-12-Mshi-dev15.git
cd iyf-s10-week-12-Mshi-dev15

### 2. Setup Backend
cd backend
npm install
Create .env file with:
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_super_secret_key_min_32_chars
FRONTEND_URL=http://localhost:5173
npm run dev  # Starts on http://localhost:3000

### 3. Setup Frontend (new terminal)
cd frontend
npm install
npm run dev  # Starts on http://localhost:5173

### 4. Test API
curl http://localhost:3000/api/health

---

## Live Demo
🔗 Frontend: [https://bridgeke-frontend.vercel.app](https://bridgeke-frontend.vercel.app)  
🔗 Backend API: [https://bridgeke-api.onrender.com/api/health](https://bridgeke-api.onrender.com/api/health)

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
| Validator middleware field mismatch | Temporarily bypassed validator for demo; planned permanent fix |

---


> 🇰🇪 Built with ❤️ for Kenyan youth by the IYF Weekend Academy Season 10 cohort.