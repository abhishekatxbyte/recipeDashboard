import React from 'react'
import { v4 as uuid } from "uuid";

import { useAppSelector } from '../../store/hooks';
import './style.css'
import EditRecipe from '../EditRecipe/EditRecipe';
const DetailRecipe = () => {
    const recipe = useAppSelector(state => state.calanderDays?.currentRecipe);
    return (
        <>
            {recipe.itemName === undefined ? <h1 style={{ display: "flex", alignItems: "center", justifyContent: "center", width: '100%' }}>click on Sub Cat</h1> :

                <div>
                    <EditRecipe />
                    <div className='details'>
                        <div className='recipe_title'><h1>{recipe ? recipe.itemName : 'hello'}</h1></div>
                        <div className='recipe_image_container'><img src={recipe.item_image} className='recipe_image' />

                            <div>
                                <p>{recipe.restaurantName}</p>
                                <p>tags : {recipe.tags}</p>
                                <a href={recipe.URL} target='_blank'> recipe Link</a>
                                <p style={{ fontSize: "15px" }}><strong>Price : </strong> <span style={{ color: "green" }}>{recipe.price}</span></p>
                                <div style={{ display: 'flex', gap: "1em", flexDirection: "column" }}>
                                    <p>Quantites</p>
                                    <div>
                                        {recipe.Quantity ? <>
                                            {recipe.Quantity.map(recipe => {
                                                return <p key={uuid()}>{recipe.variantName}</p>
                                            })}
                                        </> : <></>}
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div></div>
                    </div >
                </div>



            }
        </>
    )
}

export default DetailRecipe