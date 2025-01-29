import { Request, Response, NextFunction, application } from 'express';
import { API_BASE_URL } from '../config';
import { TaskModel } from '../models/Task';
import AppError from '../lib/AppError';
import mongoose from 'mongoose';
import { ITask } from '../types/types';

export const getTasks = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const tasks: ITask[] = await TaskModel.find();

    if (tasks.length === 0) throw new AppError('No tasks were found', 404);

    console.log('Fetched tasks succesfully');
    res.status(200).json({ tasks });
  } catch (error) {
    next(error);
  }
};

export const getTask = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const id = req.params.id;
    if (!id) throw new AppError('Identifier not found', 404);

    const task: ITask | null = await TaskModel.findById({ id });

    if (!task) throw new AppError('Task not found', 404);

    console.log('Task found', task);
    res.status(200).json({ task });
  } catch (error) {
    next(error);
  }
};

export const createTask = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { title, completed, userId } = req.body;

    console.log(title, completed, userId);

    if (title === undefined || completed === undefined || userId === undefined)
      throw new AppError('Required fields are missing', 400);

    const newTask = new TaskModel({
      title,
      completed,
      userId,
    });

    const savedTask = await newTask.save();
    console.log(savedTask);
    res.status(201).json({ savedTask });
  } catch (error) {
    next(error);
  }
};

export const updateTask = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const id = req.params.id;
    if (!id) throw new AppError('Identifier not found', 404);

    const { title, completed } = req.body;

    if (title === undefined && completed === undefined)
      throw new AppError('At least one field must be completed', 400);

    const updatedTask = await TaskModel.findByIdAndUpdate(
      id,
      { title, completed },
      { new: true }
    );

    if (!updatedTask) throw new AppError('Workout not found', 404);

    console.log('task updated:', updatedTask);
    res.status(200).json({ updatedTask });
  } catch (error) {
    next(error);
  }
};
export const deleteTask = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const id = req.params.id;

    if (!id) throw new AppError('Missing identifier', 404);

    const deletedTask: ITask | null = await TaskModel.findByIdAndDelete(id);

    if (!deletedTask) throw new AppError('Task was not found', 404);

    console.log('task deleted succesfully, deleted task:', deletedTask);
    res.status(200).json({ deletedTask });
  } catch (error) {
    next(error);
  }
};
