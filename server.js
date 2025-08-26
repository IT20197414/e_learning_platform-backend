import express from 'express';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import connectDB from './config/db.js';
import { notFound, errorHandler } from './middleware/errorMiddleware.js';

// Route imports
import userRoutes from './routes/userRoutes.js';
import courseRoutes from './routes/courseRoutes.js';

// --- Initial Setup ---
dotenv.config();
connectDB();

const app = express();

// --- Core Middleware ---
// 1. Body parser to read JSON
app.use(express.json());

// 2. Cookie parser to read cookies. MUST be before any route that uses cookies.
app.use(cookieParser());


// --- API Routes ---
// All API routes are defined here.
app.use('/api/users', userRoutes);
app.use('/api/courses', courseRoutes);


// --- Fallback and Error Handling Middleware ---
// These MUST be the last middleware to be used.
app.use(notFound);
app.use(errorHandler);


const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`);
});