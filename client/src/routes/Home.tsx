import Tasks from "../components/Tasks";
import { useTaskContext } from "../context/TaskContextProvider";
import TaskForm from "../components/TaskForm";

const Home = () => {
  const { error: fetchError, loading } = useTaskContext(); // ✅ Error from fetching tasks

  if (fetchError) return <p>{fetchError}</p>;
  if (loading) return <p>Loading...</p>;
  return (
    <div className="flex h-full w-full flex-col items-center gap-16 p-12">
      <TaskForm />
      <Tasks />
    </div>
  );
};

export default Home;
