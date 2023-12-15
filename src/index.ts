import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
// import authRoutes from './routes/auth';
// import todoRoutes from './routes/todo';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 8585;
const MONGO_URI = process.env.MONGO_URI || '';

mongoose.connect(MONGO_URI);
app.use(express.json());

// app.use('/auth', authRoutes);
// app.use('/todo', todoRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
