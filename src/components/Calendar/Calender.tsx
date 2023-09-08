import { useState } from "react"; // Import useState
import style from "./calender.module.css";
import { DroppedRecipes } from "./DroppedRecipes";
// import DateComponent from "../DateLogic/DateComponent";
// import WeekView from "../DateLogic/WeekView";
// import CalendarComponent from "../DateLogic/CalendarComponent";

const Calender = () => {


  const [calanderDays, setCalanderDays] = useState([
    { day: "mon", foodTime: { breakFast: [], lunch: [], dinner: [] } },
    { day: "tue", foodTime: { breakFast: [], lunch: [], dinner: [] } },
    { day: "wed", foodTime: { breakFast: [], lunch: [], dinner: [] } },
    { day: "thu", foodTime: { breakFast: [], lunch: [], dinner: [] } },
    { day: "fri", foodTime: { breakFast: [], lunch: [], dinner: [] } },
    { day: "sat", foodTime: { breakFast: [], lunch: [], dinner: [] } },
    { day: "sun", foodTime: { breakFast: [], lunch: [], dinner: [] } },
  ]);
  const [canCopy, setCanCopy] = useState(false)
  const [isDropSuccess, setIsDropSuccess] = useState(false)
  const [draggedRecipe, setDrggedRecipe] = useState<any>({})
  const removeRecipe = (recipeId: any, targetDay: any, targetMeal: any) => {
    setCalanderDays((prevCalanderDays) => {

      const updatedCalanderDays = prevCalanderDays.map((day) => {
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
  // console.log('should element copyied: ' + canCopy)

  const onDrop = (event: any, targetDay: any, targetMeal: any) => {
    setIsDropSuccess(true)
    setCanCopy(false);

    event.target.parentElement.parentElement.classList.remove(
      style.droppedRecipe
    );
    event.preventDefault();
    const data = JSON.parse(event.dataTransfer.getData("text/plain"));
    const { id, recipeName } = data;
    if (draggedRecipe.id === id) {
      // console.log(draggedRecipe.id === id)
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
      setCalanderDays((prevCalanderDays) => {
        const updatedCalanderDays = prevCalanderDays.map((day: any) => {
          if (day.day === targetDay) {
            return {
              ...day,
              foodTime: {
                ...day.foodTime,
                [targetMeal]: [
                  ...day.foodTime[targetMeal],
                  { id: id, recipeName: recipeName },
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




  return (
    <div className={style.calender}>
      <div className={style.dateLogic}>

      </div>
      <div className={style.calenderDays}>
        {calanderDays.map((calanderDay, index) => (
          <div className={style.calanderDay} key={index}>
            <h1 className={style.calanderDayTitle}>{calanderDay.day}</h1>
            <div className={style.date}>
              <p>{index + 18}</p>
            </div>
            <div className={style.foodBoxTitle}>
              <p>prep</p>
            </div>

            <div className={style.foodBoxContainer}>
              <div className={style.foodBox}>
                <p className={style.breakFastTitle}>breakfast</p>

                <DroppedRecipes
                  onDrop={onDrop}
                  day={calanderDay.day}
                  setDrggedRecipe={setDrggedRecipe}
                  mealTime={"breakFast"}
                  canCopy={canCopy}
                  setCanCopy={setCanCopy}
                  recipes={calanderDay.foodTime.breakFast}
                  removeRecipe={removeRecipe}
                />

              </div>
              <div className={style.foodBox}>
                <p className={style.lunchTitle}>lunch</p>

                <DroppedRecipes
                  canCopy={canCopy}
                  setDrggedRecipe={setDrggedRecipe}
                  onDrop={onDrop}
                  day={calanderDay.day}
                  mealTime={"lunch"}
                  setCanCopy={setCanCopy}
                  recipes={calanderDay.foodTime.lunch}
                  removeRecipe={removeRecipe}
                />

              </div>
              <div className={style.foodBox}>
                <p className={style.dinnerTitle}>dinner</p>

                <DroppedRecipes
                  setDrggedRecipe={setDrggedRecipe}
                  onDrop={onDrop}
                  day={calanderDay.day}
                  mealTime={"dinner"} canCopy={canCopy}
                  setCanCopy={setCanCopy}
                  recipes={calanderDay.foodTime.dinner}
                  removeRecipe={removeRecipe}
                />

              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Calender;




