import React from "react";
import '../Styling/Welcome.css'

import FULL_LOGO from "/home/ros1/Documents/carbon_calc_frontend/carbontool/VesselOptimiserSetupWizzard/src/assets/NMS.png";
const Welcome =()=>{
    return(
        <div className="welcome-section">
            <img src={FULL_LOGO} className="static_pic"></img>
            <h1 className="fancy-title">Marine Emission Forecast Tool</h1>
            <p className="subtitle">Select "Start Setup" to Begin the Process</p>
        </div>
        
    )
}
export default Welcome