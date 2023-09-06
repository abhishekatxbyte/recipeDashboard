// DroppedRecipes.js
import { useState } from "react";
import style from "./calender.module.css";
import { v4 as uuid } from "uuid";
import remove from "./../../assets/close.svg"
export const DroppedRecipes = ({
  recipes,
  onDragEnter,
  onDragLeave,
  onDragOver,
  onDrop,
  setDrggedRecipe,
  removeRecipe,
  day,
  mealTime,
}: any) => {
  const handleDragStart = (event: any, obj: any) => {
    event.dataTransfer.setData("text/plain", JSON.stringify(obj));
  };

  return (
    <>
      <div
        className={style.dropZone}
        onDrop={(event) => onDrop(event, day, mealTime)}
        onDragEnter={(event) => onDragEnter(event, day, mealTime)}
        onDragLeave={(event) => onDragLeave(event, day, mealTime)}
        onDragOver={onDragOver}
      >
        <div className={style.dropZone}>
          {recipes.map((recipe: any) => (

            <div
              className={style.recipe_name}

              key={uuid()} draggable={true} onDragStart={(e) => handleDragStart(e, recipe, day, mealTime)} onDragOver={() => {
                setDrggedRecipe({
                  id: recipe.id,
                  day: day,
                  mealTime: mealTime,
                });
              }}>
              <p className={style.recipeName}>{recipe.recipeName}</p>
              <button className={style.removeButton} onClick={() => removeRecipe(recipe.id, day, mealTime)}><img src={remove} width={"20px"} /></button>
            </div>
          ))}
        </div>
      </div >
    </>
  );
};
