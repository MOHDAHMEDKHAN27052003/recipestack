import { NavLink } from "react-router-dom";

function Nav() {

    return (
        <>
            <nav className="flex items-center justify-around py-4 bg-amber-400 text-white">
                <NavLink to="/">Home</NavLink>
            </nav>
        </>
    );
};

export default Nav;