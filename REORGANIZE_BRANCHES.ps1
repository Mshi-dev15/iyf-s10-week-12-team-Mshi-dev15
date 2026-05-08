#!/bin/bash
# Script to reorganize branches with proper separation

echo "=== Reorganizing Branches ==="
echo ""

# Save current branch
CURRENT_BRANCH=$(git branch --show-current)
echo "Current branch: $CURRENT_BRANCH"
echo ""

# Step 1: Create clean FE Task 4 branch (Team/Pages-Features)
echo "Creating clean FE Task 4 branch..."
git checkout main
git checkout -b frontend/Team/Pages-Features-CLEAN

# Add only FE Task 4 files (Pages: About, Login, Register, PostDetail, CreatePost)
git add frontend/src/pages/About.jsx
git add frontend/src/pages/Login.jsx
git add frontend/src/pages/Register.jsx
git add frontend/src/pages/PostDetail.jsx
git add frontend/src/pages/CreatePost.jsx

git commit -m "feat(FE Task 4): Add pages - About, Login, Register, PostDetail, CreatePost

Pages implemented with BridgeKE branding and Tailwind CSS styling."

echo "✅ FE Task 4 branch created"
echo ""

# Step 2: Create clean FE Task 1 branch (muiruricaroline135-crypto-routing-navigation)
echo "Creating clean FE Task 1 branch..."
git checkout main
git checkout -b frontend/muiruricaroline135-crypto-routing-navigation-CLEAN

# Add only FE Task 1 files (Routing, Navigation, AuthContext)
git add frontend/src/App.jsx
git add frontend/src/components/Layout/Layout.jsx
git add frontend/src/components/ProtectedRoute.jsx
git add frontend/src/context/AuthContext.jsx
git add frontend/src/pages/Home.jsx
git add frontend/src/pages/Posts.jsx

git commit -m "feat(FE Task 1): Setup routing, navigation, and auth context

- React Router configuration in App.jsx
- Layout with navigation menu
- ProtectedRoute for authenticated routes
- AuthContext for state management
- Home and Posts pages"

echo "✅ FE Task 1 branch created"
echo ""

# Step 3: Create clean Backend branch (Kimiti4)
echo "Creating clean Backend branch..."
git checkout main
git checkout -b backend/Kimiti4-comments-deploy-CLEAN

# Add only backend files
git add backend/src/controllers/commentsController.js
git add backend/src/routes/comments.js
git add backend/src/models/Comment.js
git add backend/src/models/Post.js
git add backend/src/models/User.js
git add backend/src/middleware/auth.js
git add backend/src/middleware/errorHandler.js
git add backend/src/middleware/logger.js
git add backend/src/config/database.js
git add backend/server.js
git add backend/src/app.js
git add backend/Dockerfile
git add docker-compose.yml
git add .github/workflows/ci.yml
git add backend/package.json
git add backend/package-lock.json

git commit -m "feat(Backend): Comments API, middleware, Docker, and CI

- Comments CRUD API with controller and routes
- User, Post, Comment models
- Auth, error handler, logger middleware
- Database configuration
- Docker setup (Dockerfile, docker-compose.yml)
- CI workflow for automated testing"

echo "✅ Backend branch created"
echo ""

# Step 4: Push all clean branches
echo "Pushing clean branches to origin..."
git push origin frontend/Team/Pages-Features-CLEAN
git push origin frontend/muiruricaroline135-crypto-routing-navigation-CLEAN
git push origin backend/Kimiti4-comments-deploy-CLEAN

echo ""
echo "=== Done! ==="
echo ""
echo "Clean branches created:"
echo "  - frontend/Team/Pages-Features-CLEAN (FE Task 4)"
echo "  - frontend/muiruricaroline135-crypto-routing-navigation-CLEAN (FE Task 1)"
echo "  - backend/Kimiti4-comments-deploy-CLEAN (Backend)"
echo ""
echo "Next steps:"
echo "1. Create PRs from these clean branches"
echo "2. After merging, delete old messy branches"
echo "3. Rename -CLEAN branches to remove suffix if desired"
