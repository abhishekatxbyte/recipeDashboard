import React, { useState } from "react";
import {
  format,
  subMonths,
  addMonths,
  startOfWeek,
  addDays,
  isSameDay,
  lastDayOfWeek,
  getWeek,
  addWeeks,
  subWeeks,
  startOfMonth,
  endOfMonth,
  endOfWeek,
} from "date-fns";
import "./Calendar.css";

const CombinedCalendar = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [isMonthView, setIsMonthView] = useState(true);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [firstDayOfWeek, setFirstDayOfWeek] = useState<any>(0); // Default is Sunday (0: Sunday, 1: Monday, etc.)

  const changeView = () => {
    setIsMonthView(!isMonthView);
  };

  const changeDate = (action) => {
    if (isMonthView) {
      if (action === "prev") {
        setCurrentDate(subMonths(currentDate, 1));
      } else if (action === "next") {
        setCurrentDate(addMonths(currentDate, 1));
      }
    } else {
      if (action === "prev") {
        setCurrentDate(subWeeks(currentDate, 1));
      } else if (action === "next") {
        setCurrentDate(addWeeks(currentDate, 1));
      }
    }
  };

  const goToToday = () => {
    setCurrentDate(new Date());
  };

  const onDateClickHandle = (day, dayStr) => {
    setSelectedDate(day);
  };

  const onFirstDayOfWeekChange = (event) => {
    setFirstDayOfWeek(parseInt(event.target.value));
  };

  const renderHeader = () => {
    const dateFormat = "MMM yyyy";
    return (
      <div className="header row flex-middle">
        <div className="col col-start">
          <div onClick={() => changeDate("prev")}>prev</div>
        </div>
        <div className="col col-center">
          <span>{format(currentDate, dateFormat)}</span>
        </div>
        <div className="col col-end">
          <div onClick={() => changeDate("next")}>next</div>
        </div>
        <div className="col today-button">
          <div onClick={goToToday}>Today</div>
        </div>
        <div className="col first-day-select">
          <select value={firstDayOfWeek} onChange={onFirstDayOfWeekChange}>
            <option value={0}>Sunday</option>
            <option value={1}>Monday</option>
            <option value={2}>Tuesday</option>
            <option value={3}>Wednesday</option>
            <option value={4}>Thursday</option>
            <option value={5}>Friday</option>
            <option value={6}>Saturday</option>
          </select>
        </div>
        <div className="col toggle-button">
          <button onClick={changeView}>
            {isMonthView ? "Switch to Week View" : "Switch to Month View"}
          </button>
        </div>
      </div>
    );
  };

  const renderDays = () => {
    const dateFormat = "EEE";
    const days = [];
    let startDate = startOfWeek(currentDate, { weekStartsOn: firstDayOfWeek }); // Adjust the start date for week view

    for (let i = 0; i < 7; i++) {
      days.push(
        <div className="col col-center" key={i}>
          {format(addDays(startDate, i), dateFormat)}
        </div>
      );
    }
    return <div className="days row">{days}</div>;
  };


  const renderCells = () => {
    const dateFormat = "d";
    const days = [];
    let day = startOfWeek(currentDate, { weekStartsOn: firstDayOfWeek });

    const endDate = isMonthView
      ? lastDayOfWeek(endOfMonth(currentDate), { weekStartsOn: firstDayOfWeek })
      : addDays(day, 6); // Adjust the end date for week view
    while (day <= endDate) {
      const formattedDate = format(day, dateFormat);
      const cloneDay = day;
      days.push(
        <div
          className={`col cell ${isSameDay(day, new Date())
              ? "today"
              : isSameDay(day, selectedDate)
                ? "selected"
                : ""
            }`}
          key={day}
          onClick={() => {
            const dayStr = format(cloneDay, "ccc dd MMM yy");
            onDateClickHandle(cloneDay, dayStr);
          }}
        >
          <span>{formattedDate}</span>
        </div>
      );
      day = addDays(day, 1);
    }

    return (
      <div className="body">
        <div className="row">{days}</div>
      </div>
    );
  };

  return (
    <div className="calendar">
      {renderHeader()}
      {renderDays()}
      {renderCells()}
    </div>
  );
};

export default CombinedCalendar;
