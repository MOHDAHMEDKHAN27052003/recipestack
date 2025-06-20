import axios from "../../configs/db";
import { loadRecipes } from "../reducers/recipeSlice";

export const asyncLoadRecipes = () => async (dispatch, getState) => {
    try {
        const { data } = await axios.get("/recipes");
        dispatch(loadRecipes(data));
        console.log("Recipes are Loaded successfully!");
    } catch (error) {
        console.log(error);
    };
};

export const asyncCreateRecipe = (recipe) => async (dispatch, getState) => {
    try {
        await axios.post("/recipes", recipe); //db
        dispatch(asyncLoadRecipes());
        console.log("Recipe is Created successfully!");
    } catch (error) {
        console.log(error);
    };
};

export const asyncUpdateRecipe =
    (id, recipe) => async (dispatch, getState) => {
        try {
            await axios.patch(`/recipes/${id}`, recipe); 
            dispatch(asyncLoadRecipes());
            console.log("Recipe is Updated successfully!");
        } catch (error) {
            console.log(error);
        };
    };

export const asyncDeleteRecipe = (id) => async (dispatch, getState) => {
    try {
        await axios.delete(`/recipes/${id}`); 
        dispatch(asyncLoadRecipes());
        console.log("Recipe is Deleted successfully!");
    } catch (error) {
        console.log(error);
    };
};