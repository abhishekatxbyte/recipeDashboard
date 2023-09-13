import { useEffect, useState } from 'react';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import { v4 as uuid } from "uuid";

import './util.css'
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { addCurrentRecipe } from '../../store/slice';
import { useNavigate, useParams } from 'react-router-dom';
function RecipeList({ recipeListKey }: any) {
    const { recipes } = useAppSelector((state: any) => state.calanderDays.currentRecipeCat);
    const { recipeId } = useParams()
    const [key, setKey] = useState(recipeId ? recipeId : 0);

    const dispatch = useAppDispatch()


    const navigate = useNavigate()


    useEffect(() => {


        const [currentRecipe] = recipes ? recipes.filter((recipe: any) => {
            return recipe.Id == key
        }) : []

        if (currentRecipe) {
            navigate(`/detail-recipe/${recipeListKey}/${key}`)

            dispatch(addCurrentRecipe(currentRecipe))
        }

    }, [key, recipes])

    return (
        <Tabs
            activeKey={key}
            onSelect={(k: any) => { setKey(k) }}
            className={'tabs'}
        >
            {recipes ? recipes.map((recipe: any) => {
                return <Tab eventKey={recipe.Id} key={uuid()} title={recipe.itemName}>

                </Tab>
            }) : <></>}
        </Tabs>
    );
}

export default (RecipeList);