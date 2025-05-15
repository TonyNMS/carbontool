import React, {useContext, useState}from "react";
import "../Styling/Season.css"
import { SetFinalAnalysisRequest } from "../App";
const Season =(props)=>{
    const [selectedSeason, setSelectedSeason] = useState("Summer");
    const finalRequestContext = useContext(SetFinalAnalysisRequest);
    const toggleSeason = () => {
        setSelectedSeason(prev => prev === "Summer" ?  "Winter": "Summer");
    };
    const handleNextStep = () =>{
        finalRequestContext.setFinalResquest((prev) =>({...prev, season:{selectedSeason}}));
        return props.next();
    }

    return(
     <div className="season-section">
        <h3>Operational Season</h3>
        <div className = "selection-section">
          <label>We need to know what season is this trip operating in</label>
        </div>

        <div className="season-container">
            <div className = "season-label">
               Season: {selectedSeason === "Summer"?  'Summer ☀️': 'Winter ❄️'}
            </div>
            <div className={`toggle-button ${selectedSeason === "Summer"?   'summer':'winter' }`}
                onClick={toggleSeason}
            >
              <div className={`slider ${selectedSeason === "Summer"? 'slide-right' : ''}`}></div>
            </div>
        </div>
        <div className="button-section-season">
            <button className="button-a" onClick={props.prev}>Go Back</button>
            <button className="button-b" onClick={handleNextStep}>Finish Setup</button>
        </div>
     </div>
    )
} 
export default Season;