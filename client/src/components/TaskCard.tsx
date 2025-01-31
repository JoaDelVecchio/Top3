import { ITask } from "../types/types";
import { useTaskContext } from "../context/TaskContextProvider";
import { API_URL } from "../config";
import { useState } from "react";

const TaskCard = ({ task }: { task: ITask }) => {
  const { setTasks } = useTaskContext();
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const handleCompleted = async (id: string) => {
    try {
      setError(null);
      setLoading(true);
      const response = await fetch(`${API_URL}/tasks/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ completed: true }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message);
      }

      const data = await response.json();
      const updatedTask = data.task;

      setTasks((prevTasks: ITask[]) =>
        prevTasks.map((task) => (task._id === id ? updatedTask : task)),
      );
    } catch (error) {
      console.error((error as Error).message || "Failed to fetch task");
      setError((error as Error).message || "Failed to fetch task");
    }
  };
  if (error) <p>{error}</p>;
  if (loading) <p>Loading...</p>;
  return (
    <div>
      <h3>{task.title}</h3>
      <h4>{task.category}</h4>
      {!task.completed && (
        <button onClick={() => handleCompleted(task._id)}>
          Mark as completed
        </button>
      )}
    </div>
  );
};

export default TaskCard;
