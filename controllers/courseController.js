import asyncHandler from 'express-async-handler';
import Course from '../models/Course.js';

// @desc    Create a new course
// @route   POST /api/courses
// @access  Private/Instructor
const createCourse = asyncHandler(async (req, res) => {
  const { title, description, category, price } = req.body;

  const course = new Course({
    title,
    description,
    category,
    price,
    instructor: req.user._id, // The instructor is the logged-in user
  });

  const createdCourse = await course.save();
  res.status(201).json(createdCourse);
});

export { createCourse };