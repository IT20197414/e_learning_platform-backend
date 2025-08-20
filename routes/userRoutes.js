import express from 'express';
const router = express.Router();
import {
  registerUser,
  authUser,
  logoutUser,
} from '../controllers/userController.js';

// Define the routes
router.post('/register', registerUser);
router.post('/login', authUser);
router.post('/logout', logoutUser);

// Export the router as the default export for this module
export default router;