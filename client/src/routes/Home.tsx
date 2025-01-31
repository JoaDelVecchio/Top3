import { useTaskContext } from "../context/TaskContextProvider";
import { ITask } from "../types/types";

const Home = () => {
  const { tasks, error, loading } = useTaskContext();

  if (error) return <p>{error}</p>;
  if (loading) return <p>loading...</p>;
  return (
    <div>
      {tasks.map((task: ITask) => (
        <li key={task._id}>{task.title}</li>
      ))}
    </div>
  );
};

export default Home;
