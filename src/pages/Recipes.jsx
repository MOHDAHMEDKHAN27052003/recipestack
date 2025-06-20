import { lazy, Suspense, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "../configs/db";
import InfiniteScroll from "react-infinite-scroll-component";
import { loadLazyRecipes } from "../store/reducers/recipeSlice";
import { Link } from "react-router-dom";

const Card = lazy(() => import("../components/Card"));

const Recipes = () => {
    const dispatch = useDispatch();
    const { recipes } = useSelector((state) => state.recipeReducer);
    const [hasMore, setHasMore] = useState(true);

    const fetchRecipes = async () => {
        try {
            const { data } = await axios.get(
                `/recipes?_limit=6&_start=${recipes.length}`
            );
            if (data.length === 0) {
                setHasMore(false);
            } else {
                dispatch(loadLazyRecipes(data));
            }
        } catch (error) {
            console.log(error);
        };
    };

    useEffect(() => {
        fetchRecipes();
    }, []);

    return (
        <InfiniteScroll
            dataLength={recipes.length}
            next={fetchRecipes}
            hasMore={hasMore}
            loader={<h4>Loading...</h4>}
            endMessage={
                <p className="text-center">
                    <b>Yay! You have seen it all</b>
                </p>
            }
        >
            <div className="text-right p-8">
                <Link to={"/create-recipe"} className="bg-amber-400 text-white p-2 rounded-lg">Create Recipe</Link>
            </div>
            <div className="p-8 md:p-20 lg:p-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-12">
                {recipes.map((recipe, index) => (
                    <Suspense key={index} fallback={<h1>LOADING...</h1>}>
                        <Card recipe={recipe} />
                    </Suspense>
                ))}
            </div>
        </InfiniteScroll>
    );
};

export default Recipes;