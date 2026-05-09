# BridgeKE - Complete Starter Template 🇰🇪

**Bridge Your Skills to Real Opportunities**

A full-stack MERN application connecting Kenyan youth with internships, gigs, volunteering opportunities, and events.

## 🚀 Quick Start

### Prerequisites
- Node.js (v16 or higher)
- MongoDB (local or Atlas)
- npm or yarn

### Installation

1. **Clone the repository**
```bash
git clone <your-repo-url>
cd BridgeKE-Starter
```

2. **Install Backend Dependencies**
```bash
cd backend
npm install
```

3. **Install Frontend Dependencies**
```bash
cd ../frontend
npm install
```

4. **Configure Environment Variables**

Backend (.env in backend/):
```env
NODE_ENV=development
PORT=3000
MONGODB_URI=mongodb://localhost:27017/bridgeke
JWT_SECRET=your-super-secret-key-min-32-characters
JWT_EXPIRES_IN=7d
FRONTEND_URL=http://localhost:5173
```

Frontend (.env in frontend/):
```env
VITE_API_URL=http://localhost:3000/api
```

5. **Start the Application**

Terminal 1 - Backend:
```bash
cd backend
npm run dev
```

Terminal 2 - Frontend:
```bash
cd frontend
npm run dev
```

6. **Access the Application**
- Frontend: http://localhost:5173
- Backend API: http://localhost:3000/api

## ✨ Features

### Authentication & Authorization
- ✅ User Registration & Login
- ✅ JWT Token-based Authentication
- ✅ Protected Routes
- ✅ Password Hashing with bcrypt
- ⚠️ OAuth integration ready (Google, GitHub - needs configuration)

### Core Functionality
- 📝 Create, Read, Update, Delete opportunities
- 🔍 Filter by category (Internship, Gig, Volunteering, Event)
- 📍 Location-based filtering
- 💬 Comments system on posts
- 👤 User profiles

### Tech Stack

**Frontend:**
- React 18 with Vite
- React Router v6 (with future flags)
- Tailwind CSS for styling
- Context API for state management
- Axios for API calls

**Backend:**
- Node.js & Express.js
- MongoDB with Mongoose
- JWT Authentication
- CORS enabled
- Error handling middleware
- Input validation

## 📁 Project Structure

```
BridgeKE-Starter/
├── backend/
│   ├── src/
│   │   ├── config/          # Database & environment config
│   │   ├── controllers/     # Route handlers
│   │   ├── middleware/      # Auth, validation, error handling
│   │   ├── models/          # Mongoose schemas
│   │   ├── routes/          # API routes
│   │   └── utils/           # Helper functions
│   ├── .env.example
│   ├── package.json
│   └── server.js
│
├── frontend/
│   ├── src/
│   │   ├── components/      # Reusable UI components
│   │   ├── context/         # React Context (Auth)
│   │   ├── pages/           # Page components
│   │   ├── services/        # API service layer
│   │   ├── hooks/           # Custom React hooks
│   │   ├── App.jsx          # Main app with routing
│   │   └── main.jsx         # Entry point
│   ├── index.html
│   ├── package.json
│   ├── tailwind.config.js
│   └── vite.config.js
│
└── README.md
```

## 🔐 Authentication Flow

1. **Registration**: User signs up → Password hashed → JWT token generated → Stored in localStorage
2. **Login**: User logs in → Credentials verified → JWT token issued → AuthContext updated
3. **Protected Routes**: Check for valid token → Allow access or redirect to login
4. **Logout**: Clear token from localStorage → Reset AuthContext

## 🎨 UI/UX Features

- Modern gradient design (blue-purple-indigo theme)
- Responsive layout (mobile-first)
- Smooth transitions and hover effects
- Loading states and error handling
- Form validation
- Toast notifications (ready for implementation)

## 🗄️ Database Models

### User
- username, email, password (hashed)
- role (user/admin)
- createdAt, updatedAt

### Post/Opportunity
- title, description, category
- location, organizationName
- tags, author (ref to User)
- createdAt, updatedAt

### Comment
- content, post (ref to Post)
- author (ref to User)
- createdAt, updatedAt

## 🛠️ API Endpoints

### Auth
- POST `/api/auth/register` - Register new user
- POST `/api/auth/login` - Login user
- GET `/api/auth/me` - Get current user

### Posts
- GET `/api/posts` - Get all posts
- GET `/api/posts/:id` - Get single post
- POST `/api/posts` - Create post (protected)
- PUT `/api/posts/:id` - Update post (protected)
- DELETE `/api/posts/:id` - Delete post (protected)

### Comments
- GET `/api/comments/:postId` - Get comments for post
- POST `/api/comments` - Add comment (protected)
- DELETE `/api/comments/:id` - Delete comment (protected)

## 🚧 Future Enhancements

- [ ] OAuth integration (Google, GitHub)
- [ ] Email verification
- [ ] Password reset functionality
- [ ] Image uploads (Cloudinary)
- [ ] Real-time notifications
- [ ] Advanced search & filters
- [ ] User profiles with avatars
- [ ] Bookmark/favorite opportunities
- [ ] Application tracking system

## 📝 Development Notes

### Adding New Features
1. Create backend route → controller → model
2. Create frontend page/component
3. Add route in App.jsx
4. Update navigation if needed
5. Test both frontend and backend

### Environment Setup
- Copy `.env.example` to `.env` in both backend and frontend
- Update MongoDB connection string
- Generate a strong JWT secret (min 32 characters)
- Configure CORS origins for production

### Testing
```bash
# Backend tests (when implemented)
cd backend
npm test

# Frontend tests (when implemented)
cd frontend
npm test
```

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is built as part of IYF Weekend Academy.

## 👥 Credits

Built with ❤️ by the BridgeKE Team
- Backend Development
- Frontend Development  
- UI/UX Design
- Database Architecture

---

**Ready to bridge skills to opportunities? Get started now! 🚀**
