import Tasks from '../components/Tasks';
import { useTaskContext } from '../context/TaskContextProvider';
import TaskForm from '../components/TaskForm';

const Home = () => {
  const { error: fetchError, loading } = useTaskContext(); // ✅ Error from fetching tasks

  if (fetchError) return <p className="text-red-500">{fetchError}</p>;
  if (loading)
    return (
      <p className="text-grey-500 animate-pulse text-center text-xl font-bold">
        Loading...
      </p>
    );
  return (
    <div className="flex h-full w-full flex-col items-center gap-16 p-12">
      <TaskForm />
      <Tasks />
    </div>
  );
};

export default Home;
