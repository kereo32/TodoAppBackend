import { Request, Response } from 'express';
import { TodoItem } from '../types';
import TodoModel from '../models/Todo';
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

const createTodo = async (req: Request, res: Response): Promise<void> => {
  try {
    console.log(req.body);
    const { title, description, tags } = req.body;

    console.log(title);

    upload.fields([
      { name: 'thumbnail', maxCount: 1 },
      { name: 'attachment', maxCount: 1 },
    ])(req, res, async (err: any) => {
      if (err) {
        console.error('Error uploading files:', err);
        res.status(500).json({ message: 'Error uploading files' });
        return;
      }

      const files = req.files as { [fieldname: string]: Express.MulterS3.File[] } | undefined;
      const thumbnailUrl = files?.['thumbnail']?.[0]?.location;
      const attachmentFileUrl = files?.['attachment']?.[0]?.location;

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

      res.status(201).json({ todo: newTodo });
    });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ message: 'Something went wrong on the server' });
  }
};

const updateTodo = async (req: Request, res: Response): Promise<void> => {
  try {
    const { _id } = req.params;
    const { title, description, tags, isActive, timeSpent } = req.body;

    upload.fields([
      { name: 'thumbnail', maxCount: 1 },
      { name: 'attachment', maxCount: 1 },
    ])(req, res, async (err: any) => {
      if (err) {
        console.error('Error uploading files:', err);
        res.status(500).json({ message: 'Error uploading files' });
        return;
      }

      const files = req.files as { [fieldname: string]: Express.MulterS3.File[] } | undefined;
      const thumbnailUrl = files?.['thumbnail']?.[0]?.location;
      const attachmentFileUrl = files?.['attachment']?.[0]?.location;

      const updatedTodo = await TodoModel.findByIdAndUpdate(
        _id,
        {
          title,
          description,
          tags,
          thumbnailUrl,
          attachmentFileUrl,
          lastUpdatedDate: new Date().toISOString(),
          isActive,
          timeSpent,
        },
        { new: true }
      );

      if (!updatedTodo) {
        res.status(404).json({ message: 'Todo not found' });
        return;
      }

      res.status(200).json({ todo: updatedTodo });
    });
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

export { getTodosByIds, createTodo, updateTodo, deleteTodo };
