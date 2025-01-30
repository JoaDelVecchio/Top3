import mongoose from 'mongoose';
import connectDB from '../config/db';
import { TaskModel } from '../models/Task';

connectDB();
const seedTasks = [
  { userId: 1, title: 'Workout at gym', completed: false, category: 'Fitness' },
  {
    userId: 1,
    title: 'Complete project report',
    completed: true,
    category: 'Work',
  },
  { userId: 2, title: 'Go for a run', completed: true, category: 'Fitness' },
  {
    userId: 2,
    title: 'Finish work presentation',
    completed: false,
    category: 'Work',
  },
];

const seedDatabase = async () => {
  try {
    await TaskModel.insertMany(seedTasks);
    console.log('Tasks seeded successfully!');
  } catch (error) {
    console.error('Error seeding database:', error);
  } finally {
    mongoose.connection.close();
  }
};

seedDatabase();
