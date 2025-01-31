import { ITask } from "../types/types";
import { createContext, useContext } from "react";
import useFetchTasks from "../hooks/useFetchTasks";

interface TaskContextType {
  tasks: ITask[];
  error: string | null;
  loading: boolean;
  updateTasks: (tasks: ITask[]) => void;
  refetch: () => void;
}

export const TaskContext = createContext<TaskContextType | undefined>(
  undefined,
);

export const useTaskContext = () => {
  const context = useContext(TaskContext);
  if (!context) throw new Error("TaskContentProvider must wrap main component");
  return context;
};

const TaskContextProvider = ({ children }: { children: React.ReactNode }) => {
  const { tasks, setTasks, error, loading, refetch } = useFetchTasks();

  const updateTasks = (tasks: ITask[]) => {
    setTasks(tasks);
  };

  return (
    <TaskContext.Provider
      value={{ tasks, updateTasks, error, loading, refetch }}
    >
      {children}
    </TaskContext.Provider>
  );
};

export default TaskContextProvider;
