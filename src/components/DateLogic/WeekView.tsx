import WeekCalander from "./WeekCalander";
import "./style.css";
import { useState } from "react";

const WeekView = () => {
  const [showDetails, setShowDetails] = useState(false);
  const [data, setData] = useState(null);

  const showDetailsHandle = (dayStr) => {
    setData(dayStr);
    setShowDetails(true);
  };

  return (
    <div className="App">
      <h1>Week View Calendar with react</h1>
      <br />
      <h2>Example</h2>
      <WeekCalander showDetailsHandle={showDetailsHandle} />
      <br />
    </div>
  );
};

export default WeekView;
