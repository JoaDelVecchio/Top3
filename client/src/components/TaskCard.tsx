import { useState } from 'react';
import { ITask } from '../types/types';
import { updateTask, deleteTask } from '../services/api';
import { useTaskContext } from '../context/TaskContextProvider';
import ErrorMessage from './ErrorMessage';

const TaskCard = ({ task }: { task: ITask }) => {
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [formData, setFormData] = useState({
    isEditing: false,
    title: task.title,
    category: task.category,
  }); // Using formData here for consistency
  const { setTasks, setWins } = useTaskContext();

  // Handle mark task as completed
  const handleCompleted = async () => {
    try {
      setLoading(true);
      setError(null);

      const updatedTask = await updateTask(task._id, { completed: true });
      setTasks((prevTasks) =>
        prevTasks.map((t) => (t._id === task._id ? updatedTask : t))
      );
      setWins((prevWins) => (prevWins ? prevWins + 1 : prevWins));
    } catch (error) {
      setError((error as Error).message || 'Failed to update task');
    } finally {
      setLoading(false);
    }
  };

  // Handle delete task
  const handleDelete = async () => {
    try {
      setLoading(true);
      setError(null);

      const deletedTask = await deleteTask(task._id);
      setTasks((prevTasks) =>
        prevTasks.filter((task) => task._id !== deletedTask._id)
      );
    } catch (error) {
      setError((error as Error).message || 'Failed to delete task');
    } finally {
      setLoading(false);
    }
  };

  // Toggle edit mode
  const handleEditToggle = () => {
    setFormData((prev) => ({
      ...prev,
      isEditing: !prev.isEditing,
    }));
  };

  // Handle the change in input fields
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Save edited task
  const handleSaveEdit = async () => {
    try {
      setLoading(true);
      setError(null);

      const updatedTask = await updateTask(task._id, {
        title: formData.title,
        category: formData.category,
      });

      setTasks((prevTasks) =>
        prevTasks.map((t) => (t._id === task._id ? updatedTask : t))
      );
      setFormData((prevData) => ({
        ...prevData,
        isEditing: false, // Close the edit form after saving
      }));
    } catch (error) {
      setError((error as Error).message || 'Failed to update task');
    } finally {
      setLoading(false);
    }
  };

  if (error) return <ErrorMessage error={error} />;

  return (
    <div className="h-42 flex w-72 flex-col justify-center gap-4 rounded-lg border border-blue-100 p-5 shadow-md duration-300 hover:scale-105 hover:border-blue-300 hover:shadow-lg">
      <div className="flex">
        <h4 className="flex-grow rounded-md bg-blue-100 text-center text-sm font-semibold">
          {task.category}
        </h4>
      </div>
      <div className="flex flex-col items-center justify-between gap-4 px-2">
        <div className="flex items-center justify-center gap-4">
          {formData.isEditing ? (
            <input
              type="text"
              name="title"
              value={formData.title} // Bind input to formData
              onChange={handleChange} // Generic change handler
              className="rounded-md border p-2 text-lg"
            />
          ) : (
            <h3
              className={`max-h-full max-w-full font-bold ${
                task.title.length > 20
                  ? 'text-sm'
                  : task.title.length > 10
                    ? 'text-lg'
                    : 'text:2xl'
              }`}
            >
              {task.title}
            </h3>
          )}
          <button
            className="text-md text-blue-300 duration-300 hover:scale-125"
            onClick={handleEditToggle} // Toggle edit form
            disabled={loading}
          >
            {formData.isEditing ? 'Cancel' : '✍️'}
          </button>
        </div>

        {formData.isEditing && (
          <div className="flex gap-4">
            <select
              name="category"
              value={formData.category} // Bind select to formData
              onChange={handleChange} // Generic change handler
              className="text-md rounded-md border p-2"
            >
              <option value="Relationships">Relationships</option>
              <option value="Work">Work</option>
              <option value="Fitness">Fitness</option>
            </select>
            <button
              onClick={handleSaveEdit}
              className="text-md text-green-500 duration-300 hover:scale-125"
              disabled={loading}
            >
              Save
            </button>
          </div>
        )}

        <div className="flex w-full items-center justify-between gap-4">
          <button
            className="text-md text-blue-300 duration-300 hover:scale-125"
            onClick={handleDelete}
            disabled={loading}
          >
            ❌
          </button>
          {loading && <span className="text-blue-100">Loading...</span>}
          <button
            className="text-md text-blue-300 duration-300 hover:scale-125"
            onClick={handleCompleted}
            disabled={loading}
          >
            ✅
          </button>
        </div>
      </div>
    </div>
  );
};

export default TaskCard;
