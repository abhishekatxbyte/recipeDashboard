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

  const onDrop = (event: any, targetDay: any, targetMeal: any) => {
    event.target.parentElement.parentElement.classList.remove(
      style.droppedRecipe
    );

    event.preventDefault();
    const data = JSON.parse(event.dataTransfer.getData("text/plain"));
    const { id, recipeName } = data;

    // Check if the recipe already exists in the same day and meal category
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

  const onDragOver = (event: MouseEvent) => {
    event.preventDefault();
  };
  const onDragEnter = (event: any) => {
    event.preventDefault();
    // event.stopPropagation();
    event.target.parentElement.parentElement.classList.add(style.droppedRecipe);
  };
  const onDragLeave = (event: any) => {
    event.preventDefault();
    // event.stopPropagation();
    event.target.parentElement.parentElement.classList.remove(
      style.droppedRecipe
    );
  };

  return (
    <div className={style.calender}>
      <div className={style.dateLogic}>
        {/* <CalendarComponent /> */}
        {/* <WeekView /> */}
        {/* <DateComponent /> */}
      </div>
      <div className={style.calenderDays}>
        {calanderDays.map((calanderDay, index) => (
          <div className={style.calanderDay} key={index}>
            <h1 className={style.calanderDayTitle}>{calanderDay.day}</h1>
            <div className={style.date}>
              <p>{index+18}</p>
            </div>
            <div className={style.foodBoxTitle}>
              <p>prep</p>
            </div>

            <div className={style.foodBoxContainer}>
              <div className={style.foodBox}>
                <p className={style.breakFastTitle}>breakfast</p>

                <DroppedRecipes
                  onDragEnter={onDragEnter}
                  onDragLeave={onDragLeave}
                  onDragOver={onDragOver}
                  onDrop={onDrop}
                  day={calanderDay.day}
                  mealTime={"breakFast"}
                  recipes={calanderDay.foodTime.breakFast}
                />
              </div>
              <div className={style.foodBox}>
                <p className={style.lunchTitle}>lunch</p>
                <DroppedRecipes
                  onDragEnter={onDragEnter}
                  onDragLeave={onDragLeave}
                  onDragOver={onDragOver}
                  onDrop={onDrop}
                  day={calanderDay.day}
                  mealTime={"lunch"}
                  recipes={calanderDay.foodTime.lunch}
                />
              </div>
              <div className={style.foodBox}>
                <p className={style.dinnerTitle}>dinner</p>
                <DroppedRecipes
                  onDragEnter={onDragEnter}
                  onDragLeave={onDragLeave}
                  onDragOver={onDragOver}
                  onDrop={onDrop}
                  day={calanderDay.day}
                  mealTime={"dinner"}
                  recipes={calanderDay.foodTime.dinner}
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
