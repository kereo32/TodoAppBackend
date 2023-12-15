import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

interface AuthRequest extends Request {
  userId?: string;
}

const authMiddleware = (req: AuthRequest, res: Response, next: NextFunction): void => {
  const secretKey = process.env.SECRET_KEY || '';
  const token = req.header('Authorization')?.replace('Bearer ', '');

  if (!token) {
    res.status(401).json({ message: 'Not authorized' });
    return;
  }

  try {
    const decoded = jwt.verify(token, secretKey);
    req.userId = (decoded as any).userId;
    next();
  } catch (error) {
    res.status(401).json({ message: `Token is not valid ${error}` });
  }
};

export default authMiddleware;
