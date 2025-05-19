import React from "react";

const CrewSelection =(props)=>{
    const handleNextSection =()=>{
        return props.next();
    }
    return(
        <div className="crew-selection-section">
            <h3>Vessel Crew Configurator</h3>
            <div className="selection-section">
                <label>Vessel Crew Select, choose the crews or this particualr journey</label>
            </div>
            <div>

            </div>
            <div className="button-section-crew">
                <button className="button-a" onClick={props.prev}>Go Back</button>
                <button className="button-b" onClick={handleNextSection}>Next Step</button>
            </div>         
        </div>
    )
}

export default CrewSelection;
