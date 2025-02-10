import { ITask } from '../types/types';
import { createContext, useContext, useEffect, useState } from 'react';
import useFetchTasks from '../hooks/useFetchTasks';

interface TaskContextType {
  tasks: ITask[];
  error: string | null;
  loading: boolean;
  setTasks: React.Dispatch<React.SetStateAction<ITask[]>>;
  refetch: () => void;
  wins: number | undefined;
  setWins: React.Dispatch<React.SetStateAction<number | undefined>>;
}

export const TaskContext = createContext<TaskContextType | undefined>(
  undefined
);

export const useTaskContext = () => {
  const context = useContext(TaskContext);
  if (!context) throw new Error('TaskContentProvider must wrap main component');
  return context;
};

const TaskContextProvider = ({ children }: { children: React.ReactNode }) => {
  const { tasks = [], setTasks, error, loading, refetch } = useFetchTasks();
  const [wins, setWins] = useState<number | undefined>(0); // Start at 0

  useEffect(() => {
    setWins(tasks.filter((task) => task.completed).length);
  }, [tasks]); // Update `wins` whenever `tasks` change

  return (
    <TaskContext.Provider
      value={{ tasks, setTasks, error, loading, refetch, wins, setWins }}
    >
      {children}
    </TaskContext.Provider>
  );
};

export default TaskContextProvider;
