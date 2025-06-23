import { useForm } from "react-hook-form";
import { nanoid } from "nanoid";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { asyncCreateRecipe } from "../store/actions/recipeActions";
import { toast } from "react-toastify";

function CreateRecipe() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { register, handleSubmit, watch } = useForm();

    const imageUrl = watch("image");

    const onError = (formErrors) => {
        const error = Object.values(formErrors)[0];
        if (error?.message) {
            toast.error(error.message);
        };
    };

    const onSubmit = (recipe) => {
        recipe.id = nanoid();
        dispatch(asyncCreateRecipe(recipe));
        toast.success("Your recipe is created successfully!");
        navigate("/");
    };

    return (
        <>
            <div className="flex justify-center px-8 py-12">
                <form
                    onSubmit={handleSubmit(onSubmit, onError)}
                    className="bg-amber-600 rounded-2xl p-8 text-white">
                    <h1 className="text-2xl">Create Recipe</h1>
                    <div className="pt-4">
                        <label htmlFor="image">
                            Image URL
                            <input
                                type="url"
                                name="image"
                                id="image"
                                {...register("image", { required: "Image URL is required" })}
                                className="bg-amber-800 rounded-lg p-2 outline-0 w-full"
                            />
                        </label>
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
                        <label htmlFor="title">
                            Title
                            <input
                                type="text"
                                {...register("title", { required: "Title is required" })}
                                className="bg-amber-800 rounded-lg p-2 outline-0 w-full"
                            />
                        </label>
                    </div>
                    <div className="pt-4">
                        <label htmlFor="chef">
                            Chef
                            <input
                                type="text"
                                {...register("chef", { required: "Chef name is required" })}
                                className="bg-amber-800 rounded-lg p-2 outline-0 w-full"
                            />
                        </label>
                    </div>
                    <div className="pt-4">
                        <label htmlFor="description">
                            Description
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
                        </label>
                    </div>
                    <div className="pt-4 text-right">
                        <button className="bg-amber-400 px-4 py-2 rounded-lg cursor-pointer">Create</button>
                    </div>
                </form>
            </div>
        </>
    );
};

export default CreateRecipe;