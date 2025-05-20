import React, { useContext } from "react";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { ResultContext } from "../App";
const FuelGauge = () => {
  const label = "Total Fuel Consumption"
  const value = useContext(ResultContext).fuel_consumption;
  const max = value *3;
  const percentage = (value / max) * 100;

  return (
    <div style={{ width: 200, height: 200, textAlign: "center" }}>
      <CircularProgressbar
        value={percentage}
        text={`${(value/1000).toFixed(2)} Tonnes`}
        styles={buildStyles({
          pathColor: percentage > 50 ? "green" : "green",
          textColor: "#000",
          trailColor: "#ddd",
        })}
      />
      <h3>{label}</h3>
    </div>
  );
};

export default FuelGauge;
