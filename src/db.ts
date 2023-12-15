import mongoose from 'mongoose';

const connectDB = async (): Promise<void> => {
  try {
    const MONGO_URI = process.env.MONGO_URI || '';

    console.log(MONGO_URI);

    await mongoose.connect(MONGO_URI);

    console.log('Connected to MongoDB');
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
    process.exit(1);
  }
};

export default connectDB;
