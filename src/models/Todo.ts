import mongoose, { Schema } from 'mongoose';
import { TodoItem } from '../types';

const todoSchema = new Schema<TodoItem>({
  title: { type: String, required: true },
  description: { type: String, required: false },
  tags: [{ type: String, required: false }],
  thumbnailUrl: { type: String, required: false },
  attachmentFileUrl: { type: String, required: false },
  creationDate: { type: String, required: true },
  lastUpdatedDate: { type: String, required: false },
  isActive: { type: Boolean, required: true },
  timeSpent: { type: Number, required: false },
});

const TodoModal = mongoose.model<TodoItem>('todoItems', todoSchema);

export default TodoModal;
