import React, { useState } from "react";
import { useTaskContext } from "../context/TaskContextProvider";
import { ITask } from "../types/types";
import { createTask } from "../services/api";
import ErrorMessage from "./ErrorMessage";

const TaskForm = () => {
  const { setTasks } = useTaskContext();
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    title: "",
    category: "",
  }); // Single state for all form fields

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value, // Dynamically update the corresponding field
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitError(null);

    if (!formData.title || !formData.category) {
      setSubmitError("Please enter a task and select a category.");
      return;
    }

    const newTask = { ...formData, userId: 1, completed: false };

    try {
      const savedTask = await createTask(newTask);
      setTasks((prevTasks: ITask[]) => [...prevTasks, savedTask]);
      setFormData({ title: "", category: "" }); // Reset form after submission
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
          value={formData.title} // Bind input to formData
          onChange={handleChange} // Generic change handler
          placeholder="New Task..."
          required
          className="rounded-lg border p-2 text-gray-500 shadow-md duration-300 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-gray-500"
        />
        <select
          name="category"
          value={formData.category} // Bind select to formData
          onChange={handleChange} // Generic change handler
          className="rounded-lg border p-2 text-gray-500 shadow-md duration-300 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-gray-500"
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

      {submitError && <ErrorMessage error={submitError} />}
    </div>
  );
};

export default TaskForm;
