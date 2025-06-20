import { Link } from "react-router-dom";

function Card({recipe}) {

    return (
        <>
            <div
                title={recipe.title}
                key={recipe.id}
                className="bg-amber-400 p-8 rounded-2xl text-center text-white"
            >
                <img src={recipe.image} alt="Image" className="rounded-2xl w-full h-40" />
                <h1 className="text-2xl">{recipe.title}</h1>
                <strong className="">by {recipe.chef}</strong>
                <p>{recipe.description.slice(0, 100)}...</p>
                <div className="py-4">
                    <Link to={`/recipe/${recipe.id}`} className="px-4 py-2 rounded-lg cursor-pointer bg-blue-400">Manage</Link>
                </div>
            </div>
        </>
    );
};

export default Card;