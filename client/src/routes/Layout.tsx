import { Outlet } from 'react-router-dom';
import NavBar from '../components/NavBar';

const Layout = () => {
  return (
    <div className="flex min-h-screen w-full flex-col font-montserrat">
      <header className="flex h-20 items-center justify-center rounded-md shadow-lg">
        <NavBar />
      </header>
      <main className="flex flex-grow justify-center">
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;
