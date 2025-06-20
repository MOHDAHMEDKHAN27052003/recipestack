import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    recipes: []
};

const recipeSlice = createSlice({
    name: "recipe",
    initialState,
    reducers: {
        loadRecipes: (state, action) => {
            state.recipes = action.payload;
        },
        loadLazyRecipes: (state, action) => {
            state.recipes = [...state.recipes, ...action.payload];
        }
    }
});

export default recipeSlice.reducer;
export const { loadRecipes, loadLazyRecipes } = recipeSlice.actions;