import React from "react";
import '../Styling/FuelDialogBox.css'
const FuelSelection =(props)=>{
    const handleNextSection=()=>{
        return props.next();
    }
    return(
        <div className="fuel-selection-section">
            <h3>Vessel Fuel Configurator</h3>
            <div className="selection-section">
                <label>Choose a type of fuel for this jounry</label>
            </div>
            <div>

            </div>
            <div className="button-section-fuel">
                <button className="button-a" onClick={props.prev}>Go Back</button>
                <button className="button-b" onClick={handleNextSection}>Next Step</button>
            </div>         
        </div>
    )
}
export default FuelSelection;