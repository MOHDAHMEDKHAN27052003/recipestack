import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
    asyncDeleteRecipe,
    asyncUpdateRecipe,
} from "../store/actions/recipeActions";
import { toast } from "react-toastify";

const Recipe = () => {
    const { id } = useParams();
    const { recipes } = useSelector((state) => state.recipeReducer);
    const recipe = recipes?.find((recipe) => recipe.id == id);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { register, handleSubmit, watch } = useForm({
        defaultValues: {
            image: recipe?.image,
            title: recipe?.title,
            chef: recipe?.chef,
            description: recipe?.description
        }
    });

    const imageUrl = watch("image");

    const UpdateHandler = (updatedRecipe) => {
        dispatch(asyncUpdateRecipe(recipe.id, updatedRecipe));
        toast.success("Your recipe is updated successfully!");
    };

    const DeleteHandler = () => {
        const confirm = window.confirm("Do you want to delete this recipe?");

        if (confirm) {
            dispatch(asyncDeleteRecipe(id));
            navigate("/");
            toast.error("You've deleted the recipe!");
        }

        return;
    };

    return recipe ? (
        <div className="px-8 py-4 md:px-12 lg:px-16 grid md:grid-cols-2 gap-8 lg:gap-24 items-center">
            <div className="">
                <img
                    src={recipe?.image}
                    className="rounded-2xl w-full md:w-3/4 h-40"
                    alt="Image"
                />
                <h1 className="text-2xl pt-2">{recipe?.title}</h1>
                <h1 className="pt-2 text-xl"><strong>{recipe?.chef}</strong></h1>
                <p className="pt-2">
                    {recipe?.description}
                </p>
            </div>
            <div className="py-16">
                <form
                    onSubmit={handleSubmit(UpdateHandler)}
                    className="bg-amber-600 p-8 lg:p-12 rounded-2xl text-white"
                >
                    <h1 className="text-3xl">
                        Manage recipe
                    </h1>
                    <div className="pt-4">
                        <label
                            htmlFor="image"
                            className="text-lg"
                        >
                            Image URL
                        </label>
                            <input
                                type="url"
                                name="image"
                                id="image"
                                {...register("image", { required: "Image URL is required" })}
                                className="bg-amber-800 rounded-lg p-2 outline-0 w-full"
                            />
                        {imageUrl && (
                            <div className="pt-4">
                                <img
                                    src={imageUrl}
                                    alt="Preview"
                                    className="w-full h-40 rounded-2xl"
                                />
                            </div>
                        )}
                    </div>
                    <div className="pt-4">
                        <label
                            htmlFor="title"
                            className="text-lg"
                        >
                            Title
                        </label>
                            <input
                                type="text"
                                {...register("title", { required: "Title is required" })}
                                className="bg-amber-800 rounded-lg p-2 outline-0 w-full"
                            />
                    </div>
                    <div className="pt-4">
                        <label
                            htmlFor="chef"
                            className="text-lg"
                        >
                            Chef
                        </label>
                            <input
                                type="text"
                                {...register("chef", { required: "Chef name is required" })}
                                className="bg-amber-800 rounded-lg p-2 outline-0 w-full"
                            />
                    </div>
                    <div className="pt-4">
                        <label
                            htmlFor="description"
                            className="text-lg"
                        >
                            Description
                        </label>
                            <textarea
                                name="description"
                                id="description"
                                {...register("description", {
                                    required: "Description is required",
                                    minLength: {
                                        value: 180,
                                        message: "Description must be at least 180 characters",
                                    },
                                    maxLength: {
                                        value: 220,
                                        message: "Description must be at most 220 characters",
                                    }
                                })}
                                className="bg-amber-800 rounded-lg p-2 outline-0 w-full"
                            >
                            </textarea>
                    </div>
                    <div className="flex justify-center gap-4 py-4">
                        <button
                            onClick={DeleteHandler}
                            type="button"
                            className="bg-red-800 px-4 py-2 rounded-lg cursor-pointer"
                        >
                            Delete
                        </button>
                        <button className="bg-amber-400 px-4 py-2 rounded-lg cursor-pointer">
                            Update
                        </button>
                    </div>
                </form>
            </div>
        </div>
    ) : (
        "Loading..."
    );
};

export default Recipe;