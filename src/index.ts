import express from 'express';
import connectDB from './db';
import authRoutes from './routes/auth';
import todoRoutes from './routes/todo';
import authMiddleware from './middlewares/auth';
import cors from 'cors';

require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 8585;

app.use(cors({ origin: '*' }));

connectDB();

app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ limit: '10mb', extended: true }));

app.use('/auth', authRoutes);
app.use('/todo', authMiddleware, todoRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
