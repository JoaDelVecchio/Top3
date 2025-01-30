import { Outlet } from "react-router-dom";
import NavBar from "../components/NavBar";

const Layout = () => {
  return (
    <div className="flex h-full w-full flex-col">
      <header className=" flex shadow-lg rounded-md justify-center items-center h-20">
        <NavBar />
      </header>
      <main className="flex flex-grow justify-center items-center">
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;
