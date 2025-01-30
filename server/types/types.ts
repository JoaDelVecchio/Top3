import { Document } from 'mongoose';

export interface ITask extends Document {
  userId: number;
  title: string;
  completed: boolean;
  category: string;
}
