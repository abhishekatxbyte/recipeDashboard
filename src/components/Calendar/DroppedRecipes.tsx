
import { useState } from "react";
import style from "./calender.module.css";
import { v4 as uuid } from "uuid";

import DropZone from "./DropZone";
export const DroppedRecipes = ({
  recipes,
  onDrop,
  setDrggedRecipe,
  removeRecipe,
  isDropSuccess,
  setCanCopy, canCopy,
  setIsDropSuccess,
  day,
  mealTime,
}: any) => {
  const [dragEntered, setDragEntered] = useState(false)
  const handleCopyButtonDragEnter = () => {
    setCanCopy(true);
  };



  const onDragOver = (event: any) => {
    event.preventDefault();
    setIsDropSuccess(false)


  }
  const onDragEnter = (event: any,) => {
    event.preventDefault();
    setDragEntered(true)
    event.target.parentElement.parentElement.classList.add(style.droppedRecipe);
  };
  const onDragLeave = (event: any) => {
    setDragEntered(false)

    event.preventDefault();
    event.target.parentElement.parentElement.classList.remove(
      style.droppedRecipe
    );
  };


  const handleDragStart = (event: any, obj: any, day: any, mealTime: any, finalMembers: any) => {
    event.dataTransfer.setData(
      "text/plain",
      JSON.stringify({ ...obj, day: day, mealTime: mealTime, members: finalMembers })
    );
    setCanCopy(false);
  };



  return (
    <>
      <div

        className={style.dropZone}
        onDrop={(event) => onDrop(event, day, mealTime)}
        onDragEnter={(event) => onDragEnter(event)}
        onDragLeave={(event) => onDragLeave(event)}
        onDragOver={onDragOver}

      >
        <div className={style.dropZone} style={{
          backgroundColor: isDropSuccess ? "#fff" : dragEntered ? "#fff7d2" : "#fff",
          transition: "all 0.3s"
        }}>


          {recipes?.map((recipe: any) => (
            <DropZone key={uuid()} recipe={recipe} handleDragStart={handleDragStart}
              removeRecipe={removeRecipe} setCanCopy={setCanCopy} canCopy={canCopy}
              handleCopyButtonDragEnter={handleCopyButtonDragEnter} setDrggedRecipe={setDrggedRecipe} day={day} mealTime={mealTime} />

          ))}

        </div>
      </div >

    </>
  );
};
