// DroppedRecipes.js
import style from "./calender.module.css";
import { v4 as uuid } from "uuid";

export const DroppedRecipes = ({
  recipes,
  onDragEnter,
  onDragLeave,
  onDragOver,
  onDrop,
  day,
  mealTime,
}: any) => {
  const handleDragStart = (event: any, obj: any) => {
    console.log(obj.id, "dargged");
    event.dataTransfer.setData("text/plain", JSON.stringify(obj)); // Set the data for the drag
  };

  //   const handleDragEnd = (event, obj) => {
  //     console.log(`Drag ended for recipe: ${obj}`);
  //     // Remove the class when dragging ends
  //     // if (event.dataTransfer.dropEffect !== "none") {
  //     //   console.log("object");

  //     //   console.log(obj);
  //     //   event.currentTarget.remove(); // Remove the element from the source list
  //     // }
  //   };
  return (
    <>
      <div
        className={style.dropZone}
        onDrop={(event) => onDrop(event, day, mealTime)}
        onDragEnter={onDragEnter}
        onDragLeave={onDragLeave}
        onDragOver={onDragOver}
      >
        <div className={style.dropZone}>
          {recipes.map((recipe: any) => (
            <div
              key={uuid()}
              draggable={true}
              onDragStart={(e) => handleDragStart(e, recipe)}
              //   onDragEnd={(e) => handleDragEnd(e, recipe)}
            >
              <p className={style.recipeName}>{recipe.recipeName}</p>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};
