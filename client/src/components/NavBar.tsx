import { NavLink } from "react-router-dom";

const NavBar = () => {
  return (
    <nav className="flex justify-center items-center">
      <ul className="flex justify-center items-center gap-8">
        <li>
          <NavLink
            className={({ isActive }) => {
              return `${
                isActive
                  ? "font-semibold text-blue-400 "
                  : " hover:font-bold hover hover:text-blue-300 duration-300"
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
                  ? "font-semibold text-blue-400 "
                  : " hover:font-bold hover hover:text-blue-300 duration-300"
              }`;
            }}
            to="/vault"
          >
            Vault
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default NavBar;
