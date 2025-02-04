import { useTaskContext } from '../context/TaskContextProvider';
import { ITask } from '../types/types';

const Wins = () => {
  const { tasks } = useTaskContext();

  return (
    <div>
      <h1>Wins</h1>
      <ul className="flex flex-col gap-4">
        {tasks
          .filter((task: ITask) => task.completed)
          .map((task: ITask) => (
            <li className="rounded-lg border border-blue-100 shadow-lg hover:scale-105">
              {task.title}
            </li>
          ))}
      </ul>
    </div>
  );
};

export default Wins;
