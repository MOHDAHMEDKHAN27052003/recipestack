import { Link } from "react-router-dom";
import notFound from "../assets/not-found.jpg"

function PageNotFound() {
    return (
        <>
            <div className="text-center">
                <h1 className="text-4xl py-4 font-bold">Invalid Link!</h1>
                <Link to='/' className="text-blue-500 text-2xl"><u>Go back to Home</u></Link>
                <div className="px-4 sm:px-40 md:px-52 lg:px-100 py-14">
                    <img src={notFound} alt="Page not found!" />
                </div>
            </div>
        </>
    );
};

export default PageNotFound;