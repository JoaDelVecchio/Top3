import { useState } from "react";
import { ITask } from "../types/types";
import { updateTask } from "../services/api";
import { useTaskContext } from "../context/TaskContextProvider";

const TaskCard = ({ task }: { task: ITask }) => {
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const { setTasks } = useTaskContext();

  const handleCompleted = async () => {
    try {
      setLoading(true);
      setError(null);

      const updatedTask = await updateTask(task._id, { completed: true });
      console.log(updatedTask);
      setTasks((prevTasks) =>
        prevTasks.map((t) => (t._id === task._id ? updatedTask : t)),
      );
    } catch (error) {
      setError(error as string);
    } finally {
      setLoading(false);
    }
  };
  if (error) return <p>{error}</p>;
  return (
    <div className=" gap-4 flex h-32 w-72 flex-col justify-center rounded-lg border border-blue-100 p-5 shadow-md duration-300 hover:scale-105 hover:shadow-lg hover:border-blue-300">
      <h4 className="text-center  bg-blue-100 text-sm font-semibold  rounded-lg px-3">
        {task.category}
      </h4>
      <div className="flex items-center justify-between">
        <h3 className="font-medium text-lg">{task.title}</h3>
        {!task.completed && (
          <button
            className="text-md text-blue-300 hover:scale-125 duration-300"
            onClick={handleCompleted}
            disabled={loading}
          >
            {loading ? "Updating..." : "✅"}
          </button>
        )}
      </div>
    </div>
  );
};

export default TaskCard;
