import { useTaskContext } from '../context/TaskContextProvider';
import TaskCard from './TaskCard';

const Tasks = () => {
  const { tasks } = useTaskContext();
  return (
    <div className="flex flex-wrap gap-10">
      {tasks && tasks.length > 0 ? (
        tasks
          .filter((task) => task && !task.completed)
          .map((task) => <TaskCard key={task._id} task={task} />)
      ) : (
        <p>You are free of tasks</p>
      )}
    </div>
  );
};

export default Tasks;
