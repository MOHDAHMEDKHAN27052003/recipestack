import { Route, Routes } from "react-router-dom";
import { lazy } from "react";

import Nav from "./components/Nav";
import Recipes from "./pages/Recipes";

const Recipe = lazy(() => import("./pages/Recipe"));
const Favorites = lazy(() => import("./pages/Favorites"));
const CreateRecipe = lazy(() => import("./pages/CreateRecipe"));
const PageNotFound = lazy(() => import("./pages/PageNotFound"));

function App() {
  return (
    <>
      <div>
        <Nav />
        <Routes>
          <Route path="/" element={<Recipes />}/>

          <Route path="/create-recipe" element={<CreateRecipe />}/>

          <Route path="/favorites" element={<Favorites />}/>

          <Route path="/recipe/:id" element={<Recipe />}/>

          <Route path="*" element={<PageNotFound />}/>
        </Routes>
      </div>
    </>
  );
};

export default App;