import { Document } from 'mongoose';

export interface User extends Document {
  id: number;
  username: string;
  password: string;
  todoItems: TodoItem[];
}

export interface TodoItem extends Document {
  id: number;
  title: string;
  description: string;
  tags: string[];
  attachmentFileUrl: string;
  thumbnailUrl: string;
  creationDate: string;
  lastUpdatedDate: string;
  isActive: boolean;
  timeSpent: number;
}
