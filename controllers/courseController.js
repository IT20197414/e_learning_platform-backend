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


// @desc    Fetch all courses
// @route   GET /api/courses
// @access  Public
const getCourses = asyncHandler(async (req, res) => {
  // We use .populate('instructor', 'name') to fetch the instructor's name
  // instead of just their ID. This is a powerful Mongoose feature.
  const courses = await Course.find({}).populate('instructor', 'name');
  res.json(courses);
});



// @desc    Fetch a single course by ID
// @route   GET /api/courses/:id
// @access  Public
const getCourseById = asyncHandler(async (req, res) => {
  const course = await Course.findById(req.params.id).populate(
    'instructor',
    'name email' // We can ask for more fields from the instructor
  );

  if (course) {
    res.json(course);
  } else {
    res.status(404);
    throw new Error('Course not found');
  }
});


export { createCourse, getCourses, getCourseById };