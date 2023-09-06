// DroppedRecipes.js
import { useState } from "react";
import style from "./calender.module.css";
import { v4 as uuid } from "uuid";
import remove from "./../../assets/close.svg"
import copy from "./../../assets/copy.svg"

export const DroppedRecipes = ({
  recipes,
  onDragEnter,
  onDragLeave,
  onDragOver,
  onDrop,
  setDrggedRecipe,
  removeRecipe,
  setCanCopy,
  canCopy,
  day,
  mealTime,
}: any) => {
  const handleCopyButtonDragEnter = () => {
    setCanCopy(true);
  };

  // Define a function to handle the drag leave event for the copy button


  const handleDragStart = (event: any, obj: any, day: any, mealTime: any) => {
    event.dataTransfer.setData(
      "text/plain",
      JSON.stringify({ ...obj, day: day, mealTime: mealTime })
    );
    setCanCopy(false);

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

              <div className={style.btns}>
                <button className={style.dragButton}
                  onDragEnter={handleCopyButtonDragEnter}
                >
                  <img src={copy} width={"20px"} />
                </button>

                <button className={style.removeButton} onClick={() => removeRecipe(recipe.id, day, mealTime)}><img src={remove} width={"20px"} /></button>
              </div>
            </div>
          ))}
        </div>
      </div >
    </>
  );
};
