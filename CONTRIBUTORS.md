# Contributors

## Team Members

| Name | GitHub | Role | Contributions |
|------|--------|------|---------------|
| Mshi Dev15 | [@Mshi-dev15](https://github.com/Mshi-dev15) | Team Lead & Full-Stack Developer | Auth system (frontend + backend), MongoDB schemas, deployment coordination |
| Kimiti4 | [@Kimiti4](https://github.com/Kimiti4) | Backend & Frontend Developer | Auth & security, advanced features, core pages implementation |
| Coddy-m | [@coddy-m](https://github.com/coddy-m) | Backend Developer | Express server setup, core routes, middleware foundation |
| ray4240 | [@ray4240](https://github.com/ray4240) | Backend Developer | Posts API CRUD operations, validation, filtering & sorting |
| xmacua | [@xmacua](https://github.com/xmacua) | Frontend Developer | Data layer, custom hooks, API service layer, reusable logic |
| ladyrancia | [@ladyrancia](https://github.com/ladyrancia) | Frontend Developer | Component library, UI system, reusable styled components |
| muiruricaroline135 | [@muiruricaroline135-crypto](https://github.com/muiruricaroline135-crypto) | Frontend Developer | Routing & navigation foundation, app structure, protected routes |

---

## Contribution Breakdown

### Mshi Dev15

#### Backend
- Set up MongoDB Atlas connection and database configuration
- Created User model with nested profile schema and geospatial indexing
- Implemented JWT authentication with bcrypt password hashing
- Built protect, optionalAuth, and restrictTo middleware
- Configured CORS, Helmet security, and rate limiting
- Created health check endpoint and error handling middleware
- Set up Express server with security middleware stack

#### Frontend
- Created AuthContext for global user state management
- Built login and register forms with validation
- Implemented protected route wrapper component
- Integrated Axios service with automatic token injection
- Configured Vite and environment variables
- Deployed frontend to Vercel with SPA routing

#### DevOps & Leadership
- Deployed backend to Render with auto-deploy
- Resolved 10+ merge conflicts across files
- Code review for all team PRs
- Coordinated deployment timeline and testing

---

### Kimiti4

#### Backend
- **Authentication & Authorization:**
  - User registration with duplicate check and password hashing
  - User login with credential validation and JWT generation
  - GET /api/auth/me protected current-user endpoint
  - Auth middleware (protect, optionalAuth, restrictTo admin/user)
  - Password reset flow implementation
  - Rate limiting on auth endpoints
  - Secure JWT practices (httpOnly cookies, token expiration)

- **Advanced Features & Deployment:**
  - Comments API with nested routes /posts/:id/comments (CRUD)
  - Post-User relationships with populate for author info
  - Authorization: only post author can edit/delete
  - Error handling middleware (ApiError class, asyncHandler wrapper)
  - Production build with static file serving
  - Health check endpoint (DB status, uptime, version)
  - Render deployment (env vars, build/start commands, monitoring)
  - API documentation (Postman collection)

#### Frontend
- **Core Pages & User Features:**
  - Home page with welcome hero and recent posts feed
  - Posts List page with grid/list view, search bar, category filters
  - Post Detail page with full content, author info, like/comment buttons
  - Create Post page with form validation and image preview
  - About page with project info and team credits
  - Like functionality with optimistic UI updates
  - Search/filter logic (client-side + API query params)

---

### Coddy-m

#### Backend
- **Server Foundation & Core Routes:**
  - Express server initialization + PORT configuration
  - Basic routes: GET /, /about, /api/health
  - Request handling: params, query strings, JSON responses
  - CORS configuration (allow frontend origins)
  - Environment variables setup (.env, dotenv)
  - Logger middleware (method, URL, timestamp, response time)
  - 404 handler & global error middleware skeleton

---

### ray4240

#### Backend
- **Posts API Core (CRUD):**
  - Migrated in-memory posts array to MongoDB
  - GET /api/posts: filtering (author, search), sorting (newest, popular), pagination
  - GET /api/posts/:id: with 404 handling
  - POST /api/posts: validation (title≥3, content≥10), sanitization
  - PUT /api/posts/:id: partial updates, runValidators
  - DELETE /api/posts/:id: soft delete option (bonus)
  - PATCH /api/posts/:id/like: atomic increment
  - Validation middleware for post creation/update

---

### xmacua

#### Frontend
- **Data Layer & Custom Hooks:**
  - useEffect patterns for data fetching (mount, deps, cleanup)
  - Custom useFetch hook (loading, error, data states)
  - useLocalStorage hook (theme, preferences persistence)
  - useToggle hook (modals, dropdowns)
  - useForm hook with validation (register, create post)
  - API service layer: postsAPI, authAPI, commentsAPI
  - Auth header injection & 401 handling

---

### ladyrancia

#### Frontend
- **Component Library & UI System:**
  - Button component (variants: primary/secondary/danger, sizes, loading)
  - Input component (labels, errors, validation states)
  - Card component (PostCard, UserCard wrappers)
  - Modal component (accessible, dismissible)
  - Avatar component (with fallback initials)
  - LoadingSpinner & ErrorMessage shared components
  - CSS Modules OR Tailwind setup + design tokens
  - Export index.js for easy imports: `import { Button, Input } from '@/components/shared'`

---

### muiruricaroline135

#### Frontend
- **Routing & Navigation Foundation:**
  - React Router setup (BrowserRouter, Routes, Route)
  - Layout component with header/nav/footer
  - Dynamic routes: /posts/:postId, /users/:userId
  - Navigation helpers: useNavigate, NavLink with active states
  - ProtectedRoute component for auth-gated pages
  - NotFound page & redirect logic
  - Integration: Connect routes to backend API endpoints

---

---

## Pull Requests Merged

| PR # | Title | Author | Status | Date |
|------|-------|--------|--------|------|
| #9 | feat: Database & data models - User, Post, Comment schemas with relationships | @Mshi-dev15 | ✅ Merged | May 3, 2026 |
| #10 | feat: Frontend auth, state & polish - AuthContext, forms, Vercel deploy | @Mshi-dev15 | ✅ Merged | May 7, 2026 |
| #18 | feat: Authentication & Authorization - register, login, protect, restrictTo | @Kimiti4 | ✅ Merged | May 8, 2026 |
| #22 | feat: Advanced features & deployment - comments API, error handling, Render | @Kimiti4 | ✅ Merged | May 8, 2026 |
| #20 | feat: Core pages & user features - Home, Posts, PostDetail, CreatePost, About | @Kimiti4 | ✅ Merged | May 8, 2026 |
| #8 | feat: Express server foundation - routes, CORS, middleware setup | @coddy-m | ✅ Merged | May 3, 2026 |
| #11 | feat: Posts API CRUD with validation, filtering, sorting | @ray4240 | ✅ Merged | May 4, 2026 |
| #23 | feat: Data layer & custom hooks - useFetch, useForm, API service | @xmacua | ✅ Merged | May 6, 2026 |
| #7 | feat: Component library & UI system - Button, Input, Card, Modal | @ladyrancia | ✅ Merged | May 5, 2026 |
| #21 | feat: Routing & navigation foundation - React Router, ProtectedRoute | @muiruricaroline135-crypto | ✅ Merged | May 8, 2026 |

---

## How We Collaborated

- Used Pull Request workflow for all changes
- Daily standups via Discord
- Code reviews on every PR
- Shared task tracking and testing

---

> 🇰🇪 Built with ❤️ by the IYF Weekend Academy Season 10 cohort.