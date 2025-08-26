import express from 'express';
const router = express.Router();
import { protect, instructor } from '../middleware/authMiddleware.js';
import { createCourse, getCourses,getCourseById, } from '../controllers/courseController.js';

// The route for creating a course.
// We apply 'protect' first, then 'instructor' middleware.
// Only if both pass will the createCourse controller function run.
router.route('/').post(protect, instructor, createCourse);


// Route for getting all courses (public) and creating a course (private)
router.route('/')
  .get(getCourses) // 2. ADD the GET handler
  .post(protect, instructor, createCourse);

// Route for '/:id'
router.route('/:id').get(getCourseById);  

export default router;