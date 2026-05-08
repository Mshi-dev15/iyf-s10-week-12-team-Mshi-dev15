const User = require('../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

// Generate Access Token
const generateAccessToken = (user) => {
  return jwt.sign(
    { id: user._id, email: user.email, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_EXPIRE || '15m' }
  );
};

// Generate Refresh Token
const generateRefreshToken = (user) => {
  return jwt.sign(
    { id: user._id, email: user.email },
    process.env.REFRESH_TOKEN_SECRET,
    { expiresIn: process.env.REFRESH_TOKEN_EXPIRE || '7d' }
  );
};

// Register User
const register = async (req, res) => {
  try {
    const { username, email, password, confirmPassword } = req.body;

    // Validation
    if (!username || !email || !password || !confirmPassword) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    if (password !== confirmPassword) {
      return res.status(400).json({ message: 'Passwords do not match' });
    }

    if (password.length < 8) {
      return res.status(400).json({ message: 'Password must be at least 8 characters' });
    }

    // Check if user exists
    const existingUser = await User.findOne({ $or: [{ email }, { username }] });
    if (existingUser) {
      return res.status(409).json({ message: 'Email or username already exists' });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new user
    const newUser = new User({
      username,
      email,
      password: hashedPassword,
      role: 'user'
    });

    await newUser.save();

    // Generate tokens
    const accessToken = generateAccessToken(newUser);
    const refreshToken = generateRefreshToken(newUser);

    // Save refresh token to database
    newUser.refreshToken = refreshToken;
    await newUser.save();

    res.status(201).json({
      message: 'User registered successfully',
      user: {
        id: newUser._id,
        username: newUser.username,
        email: newUser.email,
        role: newUser.role
      },
      accessToken,
      refreshToken
    });
  } catch (error) {
    res.status(500).json({ message: 'Error during registration', error: error.message });
  }
};

// Login User
const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validation
    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password are required' });
    }

    // Find user
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    // Compare passwords
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    // Generate tokens
    const accessToken = generateAccessToken(user);
    const refreshToken = generateRefreshToken(user);

    // Save refresh token
    user.refreshToken = refreshToken;
    user.lastLogin = new Date();
    await user.save();

    res.status(200).json({
      message: 'Login successful',
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
        role: user.role
      },
      accessToken,
      refreshToken
    });
  } catch (error) {
    res.status(500).json({ message: 'Error during login', error: error.message });
  }
};

// Refresh Access Token
const refreshToken = async (req, res) => {
  try {
    const { refreshToken: token } = req.body;

    if (!token) {
      return res.status(400).json({ message: 'Refresh token is required' });
    }

    // Verify refresh token
    jwt.verify(token, process.env.REFRESH_TOKEN_SECRET, async (err, user) => {
      if (err) {
        return res.status(403).json({ message: 'Invalid or expired refresh token' });
      }

      // Find user and verify token matches
      const foundUser = await User.findById(user.id);
      if (!foundUser || foundUser.refreshToken !== token) {
        return res.status(403).json({ message: 'Refresh token mismatch' });
      }

      // Generate new access token
      const newAccessToken = generateAccessToken(foundUser);

      res.status(200).json({
        message: 'Token refreshed successfully',
        accessToken: newAccessToken
      });
    });
  } catch (error) {
    res.status(500).json({ message: 'Error refreshing token', error: error.message });
  }
};

// Logout User
const logout = async (req, res) => {
  try {
    const userId = req.user.id;

    // Clear refresh token
    await User.findByIdAndUpdate(userId, { refreshToken: null });

    res.status(200).json({ message: 'Logout successful' });
  } catch (error) {
    res.status(500).json({ message: 'Error during logout', error: error.message });
  }
};

// Get Current User
const getCurrentUser = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password -refreshToken');
    res.status(200).json({ user });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching user', error: error.message });
  }
};

module.exports = {
  register,
  login,
  refreshToken,
  logout,
  getCurrentUser
};
