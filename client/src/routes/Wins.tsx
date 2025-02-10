import { useTaskContext } from '../context/TaskContextProvider';
import { ITask } from '../types/types';

const Wins = () => {
  const { tasks, wins, setWins } = useTaskContext();
  const completedTasks = tasks.filter((task: ITask) => task.completed);
  setWins(completedTasks.length);
  return (
    <div className="flex h-full w-full flex-col items-center gap-16 p-12">
      <h1 className="mb-4 text-2xl font-bold duration-300 hover:scale-105">
        <span className="text-blue-300">{wins} </span> Wins
      </h1>
      <ul className="flex flex-col gap-4">
        {completedTasks.map((task: ITask) => (
          <li
            key={task._id}
            className="rounded-lg p-4 shadow-md duration-300 hover:scale-105"
          >
            {task.title}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Wins;
