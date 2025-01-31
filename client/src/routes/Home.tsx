import TaskCard from "../components/TaskCard";
import { useTaskContext } from "../context/TaskContextProvider";

const Home = () => {
  const { tasks, error, loading } = useTaskContext();

  if (error) return <p>{error}</p>;
  if (loading) return <p>Loading...</p>;

  return (
    <div>
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

export default Home;
