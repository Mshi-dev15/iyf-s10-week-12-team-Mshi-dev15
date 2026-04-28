#!/usr/bin/env bash
# 🚀 BridgeKE Starter Template Setup
# Run from project root: bash scripts/setup.sh

set -e # Exit on error

# Colors
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m'

echo -e "${BLUE}🚀 BridgeKE Starter Template Setup${NC}"
echo "================================================="

# 1. Prerequisites
if ! command -v node &> /dev/null || ! command -v npm &> /dev/null; then
  echo -e "${RED}❌ Node.js v18+ & npm required. Install from https://nodejs.org${NC}"
  exit 1
fi

NODE_VER=$(node -v | cut -d'v' -f2 | cut -d'.' -f1)
if [ "$NODE_VER" -lt 18 ]; then
  echo -e "${RED}❌ Node.js v18+ required. Found v$(node -v)${NC}"
  exit 1
fi
echo -e "${GREEN}✅ Node.js $(node -v) & npm $(npm -v) detected${NC}"

# 2. Directory Structure (Idempotent)
echo -e "\n${YELLOW}📁 Creating project structure...${NC}"
mkdir -p backend/{src/{config,controllers,middleware,models,routes,utils},scripts}
mkdir -p frontend/{src/{components/{Layout,Post,shared/{Button,Input,Card,LoadingSpinner,ErrorMessage}},context,hooks,pages,services,utils},public}
mkdir -p docs scripts

# 3. Git Ignore
if [ ! -f ".gitignore" ]; then
  cat > .gitignore << 'EOF'
node_modules/
.env
.env.local
.env.*.local
dist/
build/
*.log
.idea/
.vscode/
.DS_Store
coverage/
*.tsbuildinfoEOF
  echo -e "${GREEN}✅ Created .gitignore${NC}"
fi

# 4. Environment Templates
if [ ! -f "backend/.env.example" ]; then
  cat > backend/.env.example << 'EOF'
NODE_ENV=development
PORT=3000
MONGODB_URI=mongodb+srv://<username>:<password>@<cluster-url>/bridgeke?retryWrites=true&w=majority
JWT_SECRET=your-super-secret-key-min-32-chars
JWT_EXPIRES_IN=7d
FRONTEND_URL=http://localhost:5173
EOF
  echo -e "${GREEN}✅ Created backend/.env.example${NC}"
fi

if [ ! -f "frontend/.env.example" ]; then
  cat > frontend/.env.example << 'EOF'
VITE_API_URL=http://localhost:3000/api
VITE_ENABLE_MAPS=false
VITE_ENABLE_NOTIFICATIONS=false
EOF
  echo -e "${GREEN}✅ Created frontend/.env.example${NC}"
fi

# 5. Package.json Files
if [ ! -f "backend/package.json" ]; then
  cat > backend/package.json << 'EOF'
{"name":"bridgeke-backend","version":"1.0.0","main":"server.js","scripts":{"start":"node server.js","dev":"nodemon server.js","test":"jest --watchAll","lint":"eslint src/**/*.js"},"dependencies":{"bcryptjs":"^2.4.3","cors":"^2.8.5","dotenv":"^16.3.1","express":"^4.18.2","express-rate-limit":"^7.1.0","helmet":"^7.0.0","jsonwebtoken":"^9.0.2","mongoose":"^7.5.0","node-cache":"^5.1.2"},"devDependencies":{"eslint":"^8.48.0","jest":"^29.6.4","nodemon":"^3.0.1","supertest":"^6.3.3"}}
EOF
  echo -e "${GREEN}✅ Created backend/package.json${NC}"
fi

if [ ! -f "frontend/package.json" ]; then
  cat > frontend/package.json << 'EOF'
{"name":"bridgeke-frontend","private":true,"version":"1.0.0","type":"module","scripts":{"dev":"vite","build":"vite build","preview":"vite preview","test":"vitest"},"dependencies":{"prop-types":"^15.8.1","react":"^18.2.0","react-dom":"^18.2.0","react-router-dom":"^6.16.0"},"devDependencies":{"@vitejs/plugin-react":"^4.0.3","autoprefixer":"^10.4.15","postcss":"^8.4.29","tailwindcss":"^3.3.3","vite":"^4.4.9"}}
EOF
  echo -e "${GREEN}✅ Created frontend/package.json${NC}"
fi

# 6. Install Dependencies
echo -e "\n${YELLOW}📦 Installing Backend Dependencies...${NC}"
cd backend && npm install --silent && cd ..
echo -e "${YELLOW}📦 Installing Frontend Dependencies...${NC}"
cd frontend && npm install --silent && cd ..

# 7. Create Starter Placeholder Files
echo -e "\n${YELLOW}🛠️ Creating starter placeholders for all 10 members...${NC}"
# Backend Base
cat > backend/server.js << 'EOF'
require('dotenv').config()
const app = require('./src/app')
const PORT = process.env.PORT || 3000
app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`))
EOF

cat > backend/src/app.js << 'EOF'
const express = require('express')
const cors = require('cors')
const app = express()
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.get('/api/health', (req, res) => res.json({ status: 'ok' }))
app.use('/api', require('./routes'))
module.exports = app
EOF

cat > backend/src/routes/index.js << 'EOF'
const express = require('express')
const router = express.Router()
router.use('/posts', require('./posts'))
module.exports = router
EOF

cat > backend/src/routes/posts.js << 'EOF'
const express = require('express')
const router = express.Router()
router.get('/', (req, res) => res.json({ posts: [] }))
module.exports = router
EOF

# Frontend Base
cat > frontend/index.html << 'EOF'
<!doctype html>
<html lang="en"><head><meta charset="UTF-8" /><meta name="viewport" content="width=device-width, initial-scale=1.0" /><title>BridgeKE</title></head><body><div id="root"></div><script type="module" src="/src/main.jsx"></script></body></html>
EOF

cat > frontend/src/index.css << 'EOF'
@tailwind base;
@tailwind components;
@tailwind utilities;
EOF

cat > frontend/vite.config.js << 'EOF'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
export default defineConfig({ plugins: [react()], server: { port: 5173, proxy: { '/api': { target: 'http://localhost:3000', changeOrigin: true } } } })EOF

cat > frontend/tailwind.config.js << 'EOF'
/** @type {import('tailwindcss').Config} */
export default { content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"], theme: { extend: {} }, plugins: [] }
EOF

cat > frontend/postcss.config.js << 'EOF'
export default { plugins: { tailwindcss: {}, autoprefixer: {} } }
EOF

cat > frontend/src/main.jsx << 'EOF'
import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App.jsx'
import './index.css'
ReactDOM.createRoot(document.getElementById('root')).render(<React.StrictMode><BrowserRouter><App /></BrowserRouter></React.StrictMode>)
EOF

cat > frontend/src/App.jsx << 'EOF'
import { Routes, Route } from 'react-router-dom'
import Layout from './components/Layout/Layout'
import Home from './pages/Home'
import Posts from './pages/Posts'
export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="posts" element={<Posts />} />
        <Route path="*" element={<div className="p-8 text-center">404 - Page Not Found</div>} />
      </Route>
    </Routes>
  )
}
EOF

cat > frontend/src/components/Layout/Layout.jsx << 'EOF'
import { Outlet, NavLink } from 'react-router-dom'
export default function Layout() {
  return (
    <div className="min-h-screen flex flex-col">
      <header className="bg-white shadow p-4"><nav className="flex gap-4"><NavLink to="/" className="text-blue-600 font-bold">BridgeKE</NavLink><NavLink to="/posts" className="hover:underline">Opportunities</NavLink></nav></header>
      <main className="flex-1 p-4"><Outlet /></main>
      <footer className="p-4 text-center text-gray-500">© 2026 BridgeKE 🇰🇪</footer>
    </div>
  )
}
EOF
cat > frontend/src/pages/Home.jsx << 'EOF'
export default function Home() { return <div className="p-6"><h1 className="text-2xl font-bold">Welcome to BridgeKE</h1><p className="mt-2 text-gray-600">Find local opportunities around you.</p></div> }
EOF

cat > frontend/src/pages/Posts.jsx << 'EOF'
export default function Posts() { return <div className="p-6"><h1 className="text-2xl font-bold">Opportunities</h1><p className="mt-2 text-gray-600">List view coming soon.</p></div> }
EOF

echo -e "${GREEN}✅ Starter placeholders created!${NC}"

# 8. Safe .env Copy
echo -e "\n${YELLOW}🔑 Creating .env files from templates...${NC}"
[ -f backend/.env.example ] && [ ! -f backend/.env ] && cp backend/.env.example backend/.env
[ -f frontend/.env.example ] && [ ! -f frontend/.env ] && cp frontend/.env.example frontend/.env

# 9. Final Instructions
echo -e "\n${GREEN}🎉 Setup Complete!${NC}"
echo "================================================="
echo -e "${BLUE}📋 NEXT STEPS (DO NOT SKIP):${NC}"
echo "1. Fill in secrets: backend/.env (MONGODB_URI, JWT_SECRET)"
echo "2. Start Backend: cd backend && npm run dev"
echo "3. Start Frontend: cd frontend && npm run dev"
echo "4. Open: http://localhost:5173"
echo ""
echo -e "${YELLOW}💡 Replace placeholder files with the starter code from the team templates.${NC}"
echo -e "${YELLOW}💡 Check docs/ for API contracts & team sync templates.${NC}"
echo -e "${BLUE}🇰🇪 Karibu BridgeKE!${NC}"