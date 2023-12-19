import { Request, Response } from 'express';
import { TodoItem } from '../types';
import TodoModel from '../models/Todo';
import UserModel from '../models/User';
import { upload } from '../utils/fileUpload';

const getTodosByIds = async (req: Request, res: Response): Promise<void> => {
  try {
    const { todoIds } = req.body;

    if (!todoIds || !Array.isArray(todoIds)) {
      res.status(400).json({ message: 'Invalid or missing todoIds in the request body' });
      return;
    }

    const todoItems = await TodoModel.find({ _id: { $in: todoIds } }).exec();

    res.status(200).json({ todoItems });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ message: 'Something went wrong on the server' });
  }
};

const uploadFile = async (req: Request, res: Response): Promise<void> => {
  try {
    upload.single('file')(req, res, (err: any) => {
      if (err) {
        console.error('Error uploading file:', err);
        res.status(500).json({ message: 'Error uploading file' });
        return;
      }

      const fileUrl = (req.file as any).location;
      res.status(201).json({ fileUrl });
    });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ message: 'Something went wrong on the server' });
  }
};

const createTodo = async (req: Request, res: Response): Promise<void> => {
  try {
    const { title, description, tags, attachmentFileUrl, thumbnailUrl } = req.body;
    const newTodo: TodoItem = await TodoModel.create({
      title,
      description,
      tags,
      attachmentFileUrl,
      thumbnailUrl,
      creationDate: new Date().toISOString(),
      lastUpdatedDate: new Date().toISOString(),
      isActive: true,
      timeSpent: 0,
    });

    res.status(201).json({ todoId: newTodo._id });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ message: 'Something went wrong on the server' });
  }
};

const updateTodo = async (req: Request, res: Response): Promise<void> => {
  try {
    const { _id } = req.params;
    const { title, description, tags, isActive, timeSpent, thumbnailUrl, attachmentFileUrl } = req.body;

    const updatedTodo = await TodoModel.findByIdAndUpdate(_id, {
      title,
      description,
      tags,
      thumbnailUrl,
      attachmentFileUrl,
      lastUpdatedDate: new Date().toISOString(),
      isActive,
      timeSpent,
    });

    if (!updatedTodo) {
      res.status(404).json({ message: 'Todo not found' });
      return;
    }

    res.status(200).json({ todo: updatedTodo });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ message: 'Something went wrong on the server' });
  }
};

const deleteTodo = async (req: Request, res: Response): Promise<void> => {
  try {
    const { _id } = req.params;

    const deletedTodo = await TodoModel.findByIdAndDelete(_id);

    if (!deletedTodo) {
      res.status(404).json({ message: 'Todo not found' });
      return;
    }

    res.status(200).json({ message: 'Todo deleted successfully' });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ message: 'Something went wrong on the server' });
  }
};

const addTodoIdToUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const { todoId, userId } = req.body;

    if (!todoId) {
      res.status(400).json({ message: 'Invalid or missing todoId in the request body' });
      return;
    }

    const updatedUser = await UserModel.findByIdAndUpdate(userId, { $push: { todoItems: todoId.toString() } });

    if (!updatedUser) {
      res.status(404).json({ message: 'User not found' });
      return;
    }

    res.status(200).json({ message: 'Todo added to user successfully' });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ message: 'Something went wrong on the server' });
  }
};

const removeTodoIdFromUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const { todoId, userId } = req.body;

    if (!todoId) {
      res.status(400).json({ message: 'Invalid or missing todoId in the request body' });
      return;
    }

    const updatedUser = await UserModel.findByIdAndUpdate(userId, { $pull: { todoItems: todoId.toString() } });

    if (!updatedUser) {
      res.status(404).json({ message: 'User not found' });
      return;
    }

    res.status(200).json({ message: 'Todo removed from user successfully' });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ message: 'Something went wrong on the server' });
  }
};

export { getTodosByIds, createTodo, updateTodo, deleteTodo, uploadFile, addTodoIdToUser, removeTodoIdFromUser };
