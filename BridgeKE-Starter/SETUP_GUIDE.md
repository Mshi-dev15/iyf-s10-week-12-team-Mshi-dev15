# BridgeKE-Starter Setup & Testing Guide 🚀

## ✅ What's Been Created

A complete, standalone **BridgeKE** full-stack application in the `BridgeKE-Starter/` folder with:

### Frontend (React + Tailwind CSS)
- ✅ Complete authentication system (Login, Register, JWT tokens)
- ✅ Protected routes with AuthContext
- ✅ 7 pages: Home, Posts, PostDetail, CreatePost, About, Login, Register
- ✅ Reusable components (Button, Card, Input, ErrorMessage, LoadingSpinner)
- ✅ Layout with navigation and responsive design
- ✅ Tailwind CSS styling with blue-purple-indigo gradient theme
- ✅ React Router v6 with future flags

### Backend (Node.js + Express + MongoDB)
- ✅ JWT authentication middleware
- ✅ User registration & login with password hashing
- ✅ CRUD operations for posts/opportunities
- ✅ Comments system
- ✅ Multiple models: User, Gig, Application, Message, Notification
- ✅ Routes: auth, posts, gigs, users, messages, notifications, location
- ✅ Error handling & logging middleware
- ✅ Environment variable validation
- ✅ CORS configuration

---

## 🎯 Quick Start - Test the Application

### Step 1: Install Dependencies

**Backend:**
```bash
cd BridgeKE-Starter/backend
npm install
```

**Frontend:**
```bash
cd BridgeKE-Starter/frontend
npm install
```

### Step 2: Configure Environment Variables

**Backend (.env):**
```bash
cd BridgeKE-Starter/backend
copy .env.example .env
```

Edit `.env` and update:
```env
NODE_ENV=development
PORT=3000
MONGODB_URI=mongodb+srv://YOUR_USERNAME:YOUR_PASSWORD@cluster.mongodb.net/bridgeke?retryWrites=true&w=majority
JWT_SECRET=your-super-secret-key-min-32-characters-here
JWT_EXPIRES_IN=7d
FRONTEND_URL=http://localhost:5173
```

**Frontend (.env):**
```bash
cd BridgeKE-Starter/frontend
copy .env.example .env
```

The frontend .env should have:
```env
VITE_API_URL=http://localhost:3000/api
```

### Step 3: Start MongoDB

Option 1 - Local MongoDB:
```bash
# Make sure MongoDB is running on your machine
mongod
```

Option 2 - MongoDB Atlas (Recommended):
- Create free account at https://www.mongodb.com/cloud/atlas
- Create a cluster
- Get connection string
- Update MONGODB_URI in backend/.env

### Step 4: Start the Application

**Terminal 1 - Backend:**
```bash
cd BridgeKE-Starter/backend
npm run dev
# or
node server.js
```

You should see:
```
✅ MongoDB Connected: <your-cluster>
✅ Server running on port 3000
🌐 Environment: development
```

**Terminal 2 - Frontend:**
```bash
cd BridgeKE-Starter/frontend
npm run dev
```

You should see:
```
VITE ready in XXX ms
➜  Local:   http://localhost:5173/
```

### Step 5: Test the Application

1. **Open browser**: http://localhost:5173

2. **Test Registration**:
   - Click "Sign Up" or "Get Started"
   - Fill in: Name, Email, Password, Confirm Password
   - Click "Create Account"
   - Should redirect to home page
   - Check localStorage for token

3. **Test Login**:
   - Logout if logged in
   - Click "Login"
   - Enter email and password
   - Click "Sign In"
   - Should redirect to home page
   - Navigation should show username and logout button

4. **Test Protected Routes**:
   - Try accessing http://localhost:5173/create-post without logging in
   - Should redirect to login page
   - After login, should be able to access

5. **Test Creating Posts**:
   - Click "+ Post Opportunity"
   - Fill in form fields
   - Submit
   - Should redirect to posts page

6. **Test Browsing Posts**:
   - Navigate to "Opportunities"
   - Filter by category (Internship, Gig, Volunteering, Event)
   - Click on a post to view details

---

## 🔍 Authentication Flow Verification

### 1. JWT Token Generation
When user registers or logs in:
- Backend validates credentials
- Password is hashed with bcrypt
- JWT token is generated with user ID
- Token sent to frontend
- Frontend stores in localStorage

### 2. Protected Routes
When accessing protected route:
- ProtectedRoute component checks isAuthenticated
- If not authenticated, redirects to /login
- If authenticated, renders the component

### 3. Token Verification
For API requests:
- Frontend sends token in Authorization header
- Backend auth middleware verifies token
- If valid, attaches user to request
- If invalid, returns 401 error

---

## 🧪 Testing Checklist

### Frontend Tests
- [ ] Registration form validates input
- [ ] Login form validates input
- [ ] Password confirmation matches
- [ ] Error messages display correctly
- [ ] Loading states show during API calls
- [ ] Navigation updates based on auth state
- [ ] Protected routes redirect unauthenticated users
- [ ] Logout clears token and redirects

### Backend Tests
- [ ] POST /api/auth/register creates new user
- [ ] POST /api/auth/login returns JWT token
- [ ] GET /api/auth/me returns current user
- [ ] POST /api/posts creates new post (authenticated)
- [ ] GET /api/posts returns all posts
- [ ] GET /api/posts/:id returns single post
- [ ] PUT /api/posts/:id updates post (owner only)
- [ ] DELETE /api/posts/:id deletes post (owner only)
- [ ] Invalid tokens return 401
- [ ] Missing required fields return validation errors

---

## 🛠️ Troubleshooting

### Issue: "Cannot connect to MongoDB"
**Solution:**
- Check MONGODB_URI in backend/.env
- Ensure MongoDB is running (local) or cluster is accessible (Atlas)
- Check network connectivity
- Verify username/password in connection string

### Issue: "CORS error"
**Solution:**
- Ensure FRONTEND_URL in backend/.env matches your frontend URL
- Default is http://localhost:5173
- Check that CORS middleware is enabled in app.js

### Issue: "JWT token invalid"
**Solution:**
- Clear localStorage in browser DevTools
- Logout and login again
- Ensure JWT_SECRET in backend/.env is consistent
- Check token expiration (default 7 days)

### Issue: "Port already in use"
**Solution:**
```bash
# Windows - Kill process on port 3000
netstat -ano | findstr :3000
taskkill /PID <PID> /F

# Change PORT in backend/.env to different port (e.g., 3001)
```

### Issue: "Module not found"
**Solution:**
```bash
# Reinstall dependencies
cd BridgeKE-Starter/backend
rm -rf node_modules package-lock.json
npm install

cd BridgeKE-Starter/frontend
rm -rf node_modules package-lock.json
npm install
```

---

## 📊 Project Statistics

**Total Files:** 62
- Backend: 32 files
- Frontend: 28 files
- Documentation: 2 files

**Lines of Code:** ~3,500+

**Features Implemented:**
- ✅ User Authentication (Register/Login/Logout)
- ✅ JWT Token-based Auth
- ✅ Protected Routes
- ✅ Password Hashing (bcrypt)
- ✅ CRUD for Posts
- ✅ Comments System
- ✅ Category Filtering
- ✅ Responsive Design
- ✅ Error Handling
- ✅ Input Validation

**Ready for Production?**
- ⚠️ Add HTTPS
- ⚠️ Configure production environment variables
- ⚠️ Set up proper error logging
- ⚠️ Add rate limiting
- ⚠️ Implement email verification
- ⚠️ Add OAuth (Google, GitHub)
- ⚠️ Set up CI/CD pipeline
- ⚠️ Add comprehensive tests

---

## 🎉 Success Indicators

You'll know everything is working when:
1. ✅ Backend starts without errors
2. ✅ MongoDB connects successfully
3. ✅ Frontend loads at http://localhost:5173
4. ✅ Can register a new user
5. ✅ Can login with registered user
6. ✅ JWT token stored in localStorage
7. ✅ Navigation shows logged-in state
8. ✅ Can create a post (when logged in)
9. ✅ Can view all posts
10. ✅ Protected routes redirect properly

---

## 📝 Next Steps

After confirming everything works:

1. **Customize Branding**: Update colors, logos, content
2. **Add Features**: Implement OAuth, email verification, etc.
3. **Deploy**: 
   - Backend: Railway, Render, Heroku
   - Frontend: Vercel, Netlify
   - Database: MongoDB Atlas
4. **Monitor**: Add logging and error tracking
5. **Scale**: Optimize queries, add caching

---

**Happy Coding! 🚀**

Built with ❤️ for IYF Weekend Academy
