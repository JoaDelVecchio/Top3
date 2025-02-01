import React from "react";
import { useTaskContext } from "../context/TaskContextProvider";
import { useState } from "react";
import { ITask } from "../types/types";
import { createTask } from "../services/api";
import ErrorMessage from "./ErrorMessage";

const TaskForm = () => {
  const { setTasks } = useTaskContext();
  const [submitError, setSubmitError] = useState<string | null>(null); // ✅ Separate error for submitting

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    try {
      e.preventDefault();
      setSubmitError(null);

      const formData = new FormData(e.currentTarget);
      const title = formData.get("title") as string | null;
      const category = formData.get("category") as string | null;

      if (!title || !category) {
        setSubmitError("Please enter a task and select a category.");
        return;
      }
      const newTask = { title, userId: 1, category, completed: false };

      const savedTask = await createTask(newTask);

      setTasks((prevTasks: ITask[]) => [...prevTasks, savedTask]);
    } catch (error) {
      setSubmitError((error as string) || "Failed to create new task");
    }
  };
  return (
    <div>
      <form className="flex gap-10" onSubmit={handleSubmit}>
        <input
          type="text"
          name="title"
          placeholder="New Task..."
          required
          className="rounded-lg border p-2 text-gray-500 shadow-md duration-300 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-gray-500"
        />
        <select
          className="rounded-lg border p-2 text-gray-500 shadow-md duration-300 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-gray-500"
          name="category"
          defaultValue=""
        >
          <option value="" disabled hidden>
            Choose a Pilar
          </option>
          <option value="Relationships">Relationships</option>
          <option value="Work">Work</option>
          <option value="Fitness">Fitness</option>
        </select>

        <button type="submit">Add</button>
      </form>

      {/* ✅ Show submission error */}
      {submitError && <ErrorMessage error={submitError} />}
    </div>
  );
};

export default TaskForm;
