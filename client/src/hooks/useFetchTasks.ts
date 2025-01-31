import { useEffect, useState } from "react";
import { ITask } from "../types/types";

const useFetchTasks = () => {
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [tasks, setTasks] = useState<ITask[]>([]);
  const API_URL = import.meta.env.VITE_API_BASE_URL;

  const fetchData = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`${API_URL}/tasks`);

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to fetch tasks");
      }

      const data = await response.json();
      console.log("Fetched tasks succesfully");
      setTasks(data.tasks);
    } catch (error) {
      console.log("Failed to fetch tasks", (error as Error).message);
      setError((error as Error).message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return { tasks, setTasks, error, loading, refetch: fetchData };
};

export default useFetchTasks;
