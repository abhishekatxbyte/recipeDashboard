import { useState } from "react"; // Import useState
import style from "./calender.module.css";
import { v4 as uuid } from "uuid";

import { DroppedRecipes } from "./DroppedRecipes";
const Calender = () => {


  const [calanderDays, setCalanderDays] = useState<any>([
    { day: "mon", foodTime: { breakfast: [], lunch: [], dinner: [] } },
    { day: "tue", foodTime: { breakfast: [], lunch: [], dinner: [] } },
    { day: "wed", foodTime: { breakfast: [], lunch: [], dinner: [] } },
    { day: "thu", foodTime: { breakfast: [], lunch: [], dinner: [] } },
    { day: "fri", foodTime: { breakfast: [], lunch: [], dinner: [] } },
    { day: "sat", foodTime: { breakfast: [], lunch: [], dinner: [] } },
    { day: "sun", foodTime: { breakfast: [], lunch: [], dinner: [] } },
  ]);
  const [canCopy, setCanCopy] = useState(false)
  const [isDropSuccess, setIsDropSuccess] = useState(false)
  const [draggedRecipe, setDrggedRecipe] = useState<any>({})
  const removeRecipe = (recipeId: any, targetDay: any, targetMeal: any) => {
    setCalanderDays((prevCalanderDays: any) => {

      const updatedCalanderDays = prevCalanderDays.map((day: any) => {
        if (day.day === targetDay) {
          return {
            ...day,
            foodTime: {
              ...day.foodTime,
              [targetMeal]: day.foodTime[targetMeal].filter(
                (meal: { id: any; }) => meal.id !== recipeId
              ),
            },
          };
        }
        return day;
      });

      return updatedCalanderDays;
    });
  };

  const onDrop = (event: any, targetDay: any, targetMeal: any) => {
    setIsDropSuccess(true)
    setCanCopy(false);

    event.target.parentElement.parentElement.classList.remove(
      style.droppedRecipe
    );
    event.preventDefault();
    const data = JSON.parse(event.dataTransfer.getData("text/plain"));
    const { id, recipeName, members } = data;
    if (draggedRecipe.id === id) {
      if (data.day === undefined) {

      } else if (canCopy) { }
      else if (draggedRecipe.mealTime === targetMeal && draggedRecipe.day === targetDay) {
        return
      }

      else {
        removeRecipe(draggedRecipe.id, draggedRecipe.day, draggedRecipe.mealTime)
      }
    }


    const recipeExists = calanderDays.some(
      (day: any) =>
        day.day === targetDay &&
        day.foodTime[targetMeal].some((meal: any) => meal.id === id)
    );

    if (!recipeExists) {
      setCalanderDays((prevCalanderDays: any) => {
        const updatedCalanderDays = prevCalanderDays.map((day: any) => {
          if (day.day === targetDay) {
            return {
              ...day,
              foodTime: {
                ...day.foodTime,
                [targetMeal]: [
                  ...day.foodTime[targetMeal],
                  { id: id, recipeName: recipeName, members: members ? members : 0 },
                ],
              },
            };
          }
          return day;
        });

        return updatedCalanderDays;
      });
    }
  };
  // console.log("You can " + canCopy)

  const mealTimes = ["breakfast", "lunch", "dinner"]


  return (
    <div className={style.calender} >
      <div className={style.dateLogic}>

      </div>
      <div className={style.calenderDays}>
        {calanderDays.map((calanderDay: any, index: any) => (
          <div className={style.calanderDay} key={uuid()}>
            <h1 className={style.calanderDayTitle}>{calanderDay.day}</h1>
            <div className={style.date}>
              <p>{index + 18}</p>
            </div>
            <div className={style.foodBoxTitle}>
              <p>prep</p>
            </div>

            <div className={style.foodBoxContainer}>
              {mealTimes.map((mealTime: any) => {
                return <div className={style.foodBox} >
                  <p className={`${(mealTime + 'Title')}`}>{mealTime}</p>

                  <DroppedRecipes
                    onDrop={onDrop}
                    isDropSuccess={isDropSuccess}
                    day={calanderDay.day}
                    setDrggedRecipe={setDrggedRecipe}
                    mealTime={mealTime} setIsDropSuccess={setIsDropSuccess}
                    canCopy={canCopy}
                    setCanCopy={setCanCopy}
                    recipes={calanderDay.foodTime[mealTime]}
                    removeRecipe={removeRecipe}
                  />

                </div>
              })}

            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Calender;




