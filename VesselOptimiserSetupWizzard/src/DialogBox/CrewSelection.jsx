import React, {useState}from "react";
import '../Styling/CrewDialogBox.css'
const CrewSelection =(props)=>{
    const [crewCount, setCrewCount] = useState(0);
    function handleNextSection (){
        return props.next();
    }
    function handleDoneInputCrewCount (){
        if(crewCount == 0){
            alert('Crew can not be 0');
        }else{
            props.setCrewNumber(crewCount);
        }
    }
    function handleCrewCountInput(e){
        setCrewCount(e.target.value);
    }
    return(
        <div className="crew-selection-section">
            <h3>Vessel Crew Configurator</h3>
            <div className="selection-section">
                <label>Vessel Crew Select, choose the crews or this particualr journey</label>
            </div>
            <div className="crew-input-container">
                <label>Total number of Crew on board: </label>
                <input
                    placeholder="Total Number of Crew Onboard"
                    type ="number"
                    id="crew-count"
                    onChange= {(e)=>handleCrewCountInput(e)}
                    ></input>
                <button onClick = {handleDoneInputCrewCount}>Confirm Crew Count</button>
            </div>
            <div className="button-section-crew">
                <button className="button-a" onClick={props.prev}>Go Back</button>
                <button className="button-b" onClick={handleNextSection}>Next Step</button>
            </div>         
        </div>
    )
}

export default CrewSelection;
