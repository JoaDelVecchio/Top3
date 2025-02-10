import { NavLink } from 'react-router-dom';
import { useTaskContext } from '../context/TaskContextProvider';

const NavBar = () => {
  const { wins } = useTaskContext();
  return (
    <nav className="flex items-center justify-center">
      <ul className="flex items-center justify-center gap-8">
        <li>
          <NavLink
            className={({ isActive }) => {
              return `${
                isActive
                  ? 'font-semibold text-blue-400'
                  : 'hover duration-300 hover:font-bold hover:text-blue-300'
              }`;
            }}
            to="/"
          >
            Top3
          </NavLink>
        </li>
        <li>
          <NavLink
            className={({ isActive }) => {
              return `${
                isActive
                  ? 'font-semibold text-blue-400'
                  : 'hover duration-300 hover:font-bold hover:text-blue-300'
              }`;
            }}
            to="/wins"
          >
            Wins (<span> +{wins} </span>)
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default NavBar;
