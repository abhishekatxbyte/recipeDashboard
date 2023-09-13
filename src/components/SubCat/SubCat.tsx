import { useEffect, useState } from 'react';
import { Nav, Navbar, Tabs } from 'react-bootstrap';
import style from "./subcat.module.css"
import Tab from 'react-bootstrap/Tab';
import { v4 as uuid } from "uuid";

import "./util.css"
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { addCurrentRecipe, addCurrentRecipeCat } from '../../store/slice';
import RecipeList from './RecipeList';
import { useNavigate, useParams } from 'react-router-dom';
function SubCat() {

    function groupRecipesByCategory(recipes: any) {
        const categories: any = {};

        recipes.forEach((item: any) => {
            const categoryName = item.categoryName;
            if (!categories[categoryName]) {
                categories[categoryName] = [];
            }
            categories[categoryName].push(item);
        });

        const result = Object.keys(categories).map(categoryName => ({
            filter_cat: categoryName,
            recipes: categories[categoryName]
        }));

        return result;
    }

    // Usage
    const recipes = useAppSelector((state: any) => state.calanderDays.recipes);
    const groupedRecipes = groupRecipesByCategory(recipes);
    let { recipecat } = useParams();
    const navigate = useNavigate()

    const [key, setKey] = useState(recipecat ? recipecat : groupedRecipes[0].filter_cat);
    const handleTabClick = (Key: any) => {
        setKey(Key);
        navigate(`/detail-recipe/${Key}`)

    }
    const [currentRecipeCat] = groupedRecipes.filter(recipe => {
        return recipe.filter_cat === key
    })
    const dispatch = useAppDispatch()
    useEffect(() => {
        dispatch(addCurrentRecipeCat(currentRecipeCat))
    }, [key])

    return (

        <div className='subcat_tabs'>
            <Tabs
                activeKey={key}
                onSelect={(key) => handleTabClick(key)}
                className='tabs'
            >
                {groupedRecipes.map((groupedRecipe: any) => {
                    return (
                        <Tab className='subtab' eventKey={groupedRecipe.filter_cat} key={uuid()} title={groupedRecipe.filter_cat} />
                    );
                })}
            </Tabs>
            <div className='recipe_list'>
                {currentRecipeCat ? <><RecipeList recipeListKey={key} /></> : null}

            </div>
        </div>
    );
}

export default SubCat;