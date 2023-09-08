// DroppedRecipes.js
import { useRef, useState } from "react";
import style from "./calender.module.css";
import { v4 as uuid } from "uuid";
import remove from "./../../assets/close.svg"
import copy from "./../../assets/copy.svg"
import userPlus from "./../assets/userPlus.svg"
import userMinus from "./../assets/userMinus.svg"
import Users from "./../assets/users.svg"
export const DroppedRecipes = ({
  recipes,
  onDrop,
  setDrggedRecipe,
  removeRecipe,
  setCanCopy,

  day,
  mealTime,
}: any) => {
  const handleCopyButtonDragEnter = () => {
    setCanCopy(true);
  };
  const ref: any = useRef()
  // console.log(canCopy)

  // Define a function to handle the drag leave event for the copy button


  const onDragOver = (event: any) => {
    event.preventDefault();
  }
  const onDragEnter = (event: any,) => {
    event.preventDefault();
    event.target.parentElement.parentElement.classList.add(style.droppedRecipe);
    ref.current?.classList.remove(`${style.flex}`)
  };
  const onDragLeave = (event: any) => {
    // setCanCopy(false)

    event.preventDefault();
    event.target.parentElement.parentElement.classList.remove(
      style.droppedRecipe
    );
    ref.current?.classList.add(`${style.flex}`)
  };
  const onMouseEnter = (event: any,) => {
    event.preventDefault();
    console.log('mouse entered')
    ref.current?.classList.add(`${style.flex}`)
  };
  const onMouseLeave = (event: any,) => {
    event.preventDefault();
    ref.current?.classList.remove(`${style.flex}`)
  };


  const handleDragStart = (event: any, obj: any, day: any, mealTime: any) => {
    event.dataTransfer.setData(
      "text/plain",
      JSON.stringify({ ...obj, day: day, mealTime: mealTime })
    );
    setCanCopy(false);
    ref.current.classList.add(`${style.flex}`)

    // ref.current.classList.add(`${style.flex}`)
  };



  return (
    <>
      <div
        className={style.dropZone}
        onDrop={(event) => onDrop(event, day, mealTime)}
        onDragEnter={(event) => onDragEnter(event, day, mealTime)}
        onDragLeave={(event) => onDragLeave(event, day, mealTime)}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
        onDragOver={onDragOver}
      //  onMouseOver={() => onMouseOver(ref)}
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

              <div className={style.btns} ref={ref}>
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