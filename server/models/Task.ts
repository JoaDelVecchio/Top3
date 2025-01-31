import mongoose, { Schema, model } from "mongoose";
import { ITask } from "../types/types";

const TaskSchema: Schema<ITask> = new Schema(
  {
    userId: { type: Number, required: true },
    title: { type: String, required: true },
    category: { type: String, required: true },
    completed: { type: Boolean, required: true },
  },
  { timestamps: true }
);

export const TaskModel = model<ITask>("task", TaskSchema);
