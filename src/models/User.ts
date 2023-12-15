import mongoose, { Schema } from 'mongoose';
import { User } from '../types';

const userSchema = new Schema<User>({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  todoItems: [{ type: Schema.Types.ObjectId, ref: 'todoitems' }],
});

const UserModel = mongoose.model<User>('users', userSchema);

export default UserModel;
