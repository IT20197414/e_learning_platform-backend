import express from 'express';
const router = express.Router();
import { createCourse } from '../controllers/courseController.js';
import { protect, instructor } from '../middleware/authMiddleware.js';

// The route for creating a course.
// We apply 'protect' first, then 'instructor' middleware.
// Only if both pass will the createCourse controller function run.
router.route('/').post(protect, instructor, createCourse);

export default router;