import { useState } from "react"; // Import useState
import style from "./calender.module.css";
import { v4 as uuid } from "uuid";

import { DroppedRecipes } from "./DroppedRecipes";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { updateCalanderDays } from "../../store/slice";
const Calender = () => {
  const days = useAppSelector(state => state.calanderDays.calanderDays)
  const [calanderDays, setCalanderDays] = useState(days)
  const dispatch = useAppDispatch()
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
    })

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
      })
      dispatch(updateCalanderDays(calanderDays))
    }
  };



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
              {mealTimes.map((mealTime: any, index: number) => {
                return <div className={style.foodBox} key={uuid()}>
                  <p className={`${(mealTime + 'Title')}`} >{mealTime}</p>

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



