import express from 'express';
import dotenv from 'dotenv';
import connectDB from './db';
import authRoutes from './routes/auth';
import todoRoutes from './routes/todo';
import authMiddleware from './middlewares/auth';

require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 8585;

connectDB();

app.use(express.json());

app.use('/auth', authRoutes);
app.use('/todo', authMiddleware, todoRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
