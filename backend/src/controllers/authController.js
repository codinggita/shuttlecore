const jwt = require('jsonwebtoken');
const User = require('../models/User');

/**
 * @desc    Register a new user
 * @route   POST /api/auth/register
 * @access  Public
 */
exports.register = async (req, res, next) => {
  try {
    const { firstName, lastName, email, password, organization, role, avatar } = req.body;

    // Check if user exists
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Create user
    const user = await User.create({
      firstName,
      lastName,
      email,
      password,
      organization,
      role: role || 'user',
      avatar: avatar || ''
    });

    // Generate token
    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET || 'your_super_secret_jwt_key_change_in_production',
      { expiresIn: process.env.JWT_EXPIRE || '7d' }
    );

    // Store user profile in localStorage format for frontend compatibility
    const userProfile = {
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      organization: user.organization || '',
      role: user.role,
      avatar: user.avatar || ''
    };

    res.status(201).json({
      success: true,
      token,
      user: userProfile
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Login user
 * @route   POST /api/auth/login
 * @access  Public
 */
exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    // Validate email & password
    if (!email || !password) {
      return res.status(400).json({ message: 'Please provide email and password' });
    }

    // Check for user
    const user = await User.findOne({ email }).select('+password');
    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Check if user is active
    if (!user.isActive) {
      return res.status(401).json({ message: 'Account is deactivated' });
    }

    // Check password
    const isMatch = await user.matchPassword(password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Generate token
    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET || 'your_super_secret_jwt_key_change_in_production',
      { expiresIn: process.env.JWT_EXPIRE || '7d' }
    );

    // Store user profile in localStorage format for frontend compatibility
    const userProfile = {
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      organization: user.organization || '',
      role: user.role,
      avatar: user.avatar || ''
    };

    res.status(200).json({
      success: true,
      token,
      user: userProfile
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Get current logged in user
 * @route   GET /api/auth/me
 * @access  Private
 */
exports.getMe = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id);

    const userProfile = {
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      organization: user.organization || '',
      role: user.role,
      avatar: user.avatar || ''
    };

    res.status(200).json({
      success: true,
      user: userProfile
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Logout user
 * @route   POST /api/auth/logout
 * @access  Private
 */
exports.logout = async (req, res, next) => {
  try {
    // In a real app, you might want to blacklist the token
    // For now, we just return success - frontend handles localStorage cleanup
    res.status(200).json({
      success: true,
      message: 'Logged out successfully'
    });
  } catch (error) {
    next(error);
  }
};
