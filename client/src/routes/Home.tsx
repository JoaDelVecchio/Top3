import Tasks from "../components/Tasks";
import { useTaskContext } from "../context/TaskContextProvider";

const Home = () => {
  const { error, loading } = useTaskContext();

  if (error) return <p>{error}</p>;
  if (loading) return <p>Loading...</p>;

  return (
    <div className="flex h-full w-full flex-col p-12 items-center gap-16">
      <div>
        <input
          type="text"
          placeholder="New Task..."
          className="border focus:ring-2 focus:outline-none focus:ring-gray-500  text-gray-500 shadow-md rounded-lg p-2 hover:scale-105 duration-300"
        />
      </div>
      <Tasks />
    </div>
  );
};

export default Home;
