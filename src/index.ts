import express from 'express';
import dotenv from 'dotenv';
import connectDB from './db';
import authRoutes from './routes/auth';
// import todoRoutes from './routes/todo';

require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 8585;

connectDB();

app.use(express.json());

app.use('/auth', authRoutes);
// app.use('/todo', todoRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
