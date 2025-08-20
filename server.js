import express from 'express';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import userRoutes from './routes/userRoutes.js';
import { notFound, errorHandler } from './middleware/errorMiddleware.js';

// Load environment variables
dotenv.config();

// Connect to MongoDB
connectDB();

const app = express();

// Middleware to parse JSON request bodies
app.use(express.json());

// --- API Routes ---
// Any request starting with '/api/users' will be handled by userRoutes
app.use('/api/users', userRoutes);

// --- Custom Error Handling Middleware ---
app.use(notFound);      // This will catch any request that doesn't match the routes above
app.use(errorHandler);  // This is our custom error handler

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`);
});