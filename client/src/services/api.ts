import { API_URL } from "../config";

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
    return data.task; // ✅ Return the updated task
  } catch (error) {
    console.error("Error updating task:", error);
    throw error;
  }
};
