import { useState } from "react";
import { ITask } from "../types/types";
import { updateTask } from "../services/api";
import { useTaskContext } from "../context/TaskContextProvider";

const TaskCard = ({ task }: { task: ITask }) => {
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const { setTasks } = useTaskContext(); // ✅ Get `setTasks` from context

  const handleCompleted = async () => {
    try {
      setLoading(true);
      setError(null);

      const updatedTask = await updateTask(task._id, { completed: true });

      // ✅ Update state with the new task
      setTasks((prevTasks) =>
        prevTasks.map((t) => (t._id === task._id ? updatedTask : t)),
      );
    } catch (error) {
      setError(error as string);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      {error && <p>{error}</p>}
      {loading && <p>Loading...</p>}
      <h3>{task.title}</h3>
      <h4>{task.category}</h4>
      {!task.completed && (
        <button onClick={handleCompleted} disabled={loading}>
          {loading ? "Updating..." : "Mark as completed"}
        </button>
      )}
    </div>
  );
};

export default TaskCard;
