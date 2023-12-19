import { Request, Response } from 'express';
import { User } from '../types';
import UserModel from '../models/User';
import { generateToken } from '../utils/authUtils';
import bcrypt from 'bcryptjs';

const isExistingUser = async (username: string): Promise<User | null> => {
  return (await UserModel.findOne({ username })) as User | null;
};

const register = async (req: Request, res: Response): Promise<void> => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      res.status(400).json({ message: 'Username and password are required' });
      return;
    }

    const hashedPassword = await bcrypt.hash(password, 11);

    if (await isExistingUser(username)) {
      res.status(400).json({ message: 'Username already exists' });
      return;
    }

    const newUser: User = await UserModel.create({
      username,
      password: hashedPassword,
      todoItems: [],
    });

    const token = generateToken(newUser);

    res.status(201).json({ message: 'Registration successful', token, user: { username: newUser.username, todoIds: newUser.todoItems, userId: newUser._id } });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ message: 'Something went wrong on the server' });
  }
};

const login = async (req: Request, res: Response): Promise<void> => {
  try {
    const { username, password } = req.body;

    const existingUser = await isExistingUser(username);

    if (!existingUser) {
      res.status(400).json({ message: 'Invalid username or password' });
      return;
    }

    const isPasswordCorrect = await bcrypt.compare(password, existingUser.password);

    if (!isPasswordCorrect) {
      res.status(400).json({ message: 'Invalid Password' });
      return;
    }

    const token = generateToken(existingUser);

    res
      .status(200)
      .json({ message: 'Login successful', token, user: { username: existingUser.username, todoIds: existingUser.todoItems, userId: existingUser._id } });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Something went wrong on the server' });
  }
};

export { register, login };
