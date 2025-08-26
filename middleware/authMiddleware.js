import jwt from 'jsonwebtoken';
import asyncHandler from 'express-async-handler';
import User from '../models/User.js';

const protect = asyncHandler(async (req, res, next) => {
  let token;

  // Read the JWT from the httpOnly cookie
  token = req.cookies.jwt;

  if (token) {
    try {
      // Verify the token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // Get user from the database and attach it to the request object
      // We exclude the password field from being returned
      req.user = await User.findById(decoded.userId).select('-password');

      next(); // Move on to the next middleware or the route handler
    } catch (error) {
      console.error(error);
      res.status(401);
      throw new Error('Not authorized, token failed');
    }
  } else {
    res.status(401);
    throw new Error('Not authorized, no token');
  }
});

// Middleware to check for instructor role
const instructor = (req, res, next) => {
  if (req.user && req.user.role === 'Instructor') {
    next();
  } else {
    res.status(401);
    throw new Error('Not authorized as an instructor');
  }
};

export { protect, instructor };