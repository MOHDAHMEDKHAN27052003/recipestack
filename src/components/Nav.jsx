import { NavLink } from "react-router-dom";

function Nav() {

    return (
        <nav className="flex items-center justify-evenly py-4 bg-amber-400 text-white m-4 md:mx-48 lg:mx-108 rounded-2xl">
            <NavLink
                to="/"
                className={({ isActive }) =>
                    `${isActive ? "text-blue-400" : ''}`
                }
            >
                Home
            </NavLink>

            <NavLink
                to="/favorites"
                className={({ isActive }) =>
                    `${isActive ? "text-blue-400" : ''}`
                }
            >
                Favorites
            </NavLink>
        </nav>
    );
};

export default Nav;