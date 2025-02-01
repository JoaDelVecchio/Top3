import { API_URL } from "../config";

export const createTask = async (task: any) => {
  try {
    const response = await fetch(`${API_URL}/tasks`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(task),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Failed to add new task");
    }

    const data = await response.json();
    const newTask = data.savedTask;

    console.log("New task created", newTask);

    return newTask;
  } catch (error) {
    console.error("Error creating new task", error);
    throw (error as Error).message;
  }
};

export const updateTask = async (id: string, updates: any) => {
  try {
    const response = await fetch(`${API_URL}/tasks/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updates),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Failed to update task");
    }

    const data = await response.json();
    return data.updatedTask;
  } catch (error) {
    console.error(
      "Error updating task:",
      (error as Error).message || "Unexpected Error",
    );
    throw (error as Error).message;
  }
};
