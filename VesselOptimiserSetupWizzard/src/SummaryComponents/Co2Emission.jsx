import React, { useContext } from "react";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { ResultContext } from "../App";
const Co2Emissioin =()=>{
  const label = "Total CO₂ emission"
  const value = useContext(ResultContext).co2_emission;
  const max = value *4;
  const percentage = (value / max) * 100;

  return (
    <div style={{ width: 200, height: 200, textAlign: "center" }}>
      <CircularProgressbar
        value={percentage}
        text={`${(value/1000).toFixed(2)} Ton`}
        styles={buildStyles({
          pathColor: percentage > 50 ? "green" : "red",
          textColor: "#000",
          trailColor: "#ddd",
          
    
        })}
      />
      <h3>{label}</h3>
    </div>
  );
}
export default Co2Emissioin;