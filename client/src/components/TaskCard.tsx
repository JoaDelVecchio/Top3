import { useState } from "react";
import { ITask } from "../types/types";
import { updateTask } from "../services/api";
import { useTaskContext } from "../context/TaskContextProvider";
import ErrorMessage from "./ErrorMessage";

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

  const handleDelete = () => {};
  const handleEdit = () => {};

  if (error) return <ErrorMessage error={error} />;
  return (
    <div className=" gap-4 flex h-32 w-72 flex-col justify-center rounded-lg border border-blue-100 p-5 shadow-md duration-300 hover:scale-105 hover:shadow-lg hover:border-blue-300">
      <div className="flex">
        <h4 className="text-center flex-grow  bg-blue-100 text-sm font-semibold  rounded-md">
          {task.category}
        </h4>
      </div>
      <div className="flex flex-col items-center justify-between gap-4 px-2">
        <div className="flex justify-center items-center gap-4">
          <h3 className="font-bold text-2xl">{task.title} </h3>
          <button
            className="text-md text-blue-300 hover:scale-125 duration-300"
            onClick={handleEdit}
            disabled={loading}
          >
            ✍️
          </button>
        </div>
        <div className="flex w-full justify-between items-center gap-4">
          <button
            className="text-md text-blue-300 hover:scale-125 duration-300"
            onClick={handleDelete}
            disabled={loading}
          >
            {loading ? "Deleting..." : "❌"}
          </button>
          <button
            className="text-md text-blue-300 hover:scale-125 duration-300"
            onClick={handleCompleted}
            disabled={loading}
          >
            {loading ? "Another Win..." : "✅"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default TaskCard;
