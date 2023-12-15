import jwt from 'jsonwebtoken';
import { User } from '../types';

const generateToken = (user: User): string => {
  const secretKey = process.env.SECRET_KEY || '';

  const payload = {
    userId: user._id,
    username: user.username,
  };

  const options = {
    expiresIn: '1h',
  };

  return jwt.sign(payload, secretKey, options);
};

export { generateToken };
