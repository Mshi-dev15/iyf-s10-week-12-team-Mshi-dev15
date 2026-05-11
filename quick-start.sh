#!/bin/bash
# BridgeKE Quick Start Script
# This script helps you quickly set up and run BridgeKE

echo "🚀 BridgeKE Quick Start"
echo "======================"
echo ""

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js 20+ first."
    exit 1
fi

echo "✅ Node.js version: $(node --version)"
echo ""

# Check if MongoDB is running
echo "📦 Checking MongoDB..."
if mongosh --eval "db.adminCommand('ping')" &> /dev/null; then
    echo "✅ MongoDB is running"
else
    echo "⚠️  MongoDB might not be running. Please start MongoDB first."
    echo "   Run: mongod"
    echo ""
fi

# Install backend dependencies
echo "🔧 Installing backend dependencies..."
cd backend
npm install --silent
if [ $? -eq 0 ]; then
    echo "✅ Backend dependencies installed"
else
    echo "❌ Failed to install backend dependencies"
    exit 1
fi
cd ..
echo ""

# Install frontend dependencies
echo "🔧 Installing frontend dependencies..."
cd frontend
npm install --silent
if [ $? -eq 0 ]; then
    echo "✅ Frontend dependencies installed"
else
    echo "❌ Failed to install frontend dependencies"
    exit 1
fi
cd ..
echo ""

# Check for .env files
echo "📝 Checking environment files..."
if [ ! -f backend/.env ]; then
    echo "⚠️  backend/.env not found. Copying from .env.example..."
    cp backend/.env.example backend/.env
    echo "✅ Created backend/.env - Please update with your settings"
fi

if [ ! -f frontend/.env ]; then
    echo "⚠️  frontend/.env not found. Copying from .env.example..."
    cp frontend/.env.example frontend/.env
    echo "✅ Created frontend/.env"
fi
echo ""

echo "🎉 Setup complete!"
echo ""
echo "To start the application:"
echo ""
echo "Terminal 1 - Backend:"
echo "  cd backend && npm run dev"
echo ""
echo "Terminal 2 - Frontend:"
echo "  cd frontend && npm run dev"
echo ""
echo "Then visit: http://localhost:5173"
echo ""
