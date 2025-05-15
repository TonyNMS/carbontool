import React, { useState, useContext } from "react";
import "../Styling/powerTrain.css"
import { SetFinalAnalysisRequest } from "../App";

function PowerTrain(props){
    const [pwrSpecs, setPwrSpecs] = useState({
        vessel_length : 29.622,
        vessel_width : 8.5,
        block_coeffcient : 0.48,
        draught : 3.7,
    });
 
    const serFinalRes = useContext(SetFinalAnalysisRequest);
    const handleVesselParameterInput =(e)=>{
        switch (e.target.name){
            case "length":
                setPwrSpecs((prev)=>({
                    ...prev , vessel_length : Number(e.target.value)
                }))
                break
            case "width":
                setPwrSpecs((prev)=>({
                    ...prev , vessel_width : Number(e.target.value)
                }))
                break
            case "power":
                setPwrSpecs((prev)=>({
                    ...prev , block_coeffcient : Number(e.target.value)
                }))
                break
            case "volume":
                setPwrSpecs((prev)=>({
                    ...prev , draught : Number(e.target.value)
                }))
                break
        }
    }
    const handleNextSection = () =>{

        if (pwrSpecs.vessel_length==0 || pwrSpecs.vessel_width==0 || pwrSpecs.generator_rated_power==0 || pwrSpecs.fuel_volume==0){
            alert("Missing Field not Filled In")
            return;
        }else{
            console.log(pwrSpecs);
            serFinalRes.setFinalResquest((prev)=>(
                {
                    ...prev,
                    design_particulars: {
                        "length": pwrSpecs.vessel_length,
                        "breadth": pwrSpecs. vessel_width,
                        "draught":  pwrSpecs.draught,
                        "block_coefficient": pwrSpecs.block_coeffcient,
                      },
                }
            ))
            return props.next()
        }
    }


    return(
        <div className="powertrain-section">
            <h3>About Vessel's Power Train Configuration</h3>
            <div className="selectuon-section">
                <label>Please provide vessel's power train configuration</label>
            </div>
            <div className="powertrain-input-section">
                <table>
                    <thead>
                        <tr><th>Component</th><th></th><th>Value</th></tr>
                    </thead>
                    <tbody>
                        <tr><td>Vessel Length</td><td>------</td><td><input type="number" placeholder={`Default to ${pwrSpecs.vessel_length} m`} name="length" onChange={(e)=>handleVesselParameterInput(e)}></input></td></tr>
                        <tr><td>Vessel Breadth</td><td>------</td><td><input type="number" placeholder={`Default to ${pwrSpecs.vessel_width} m`}  name="width" onChange={(e)=>handleVesselParameterInput(e)}></input></td></tr>
                        <tr><td>Draught</td><td>------</td><td><input type="number" placeholder={`Default to ${pwrSpecs.draught} m`}  name="volume" onChange={(e)=>handleVesselParameterInput(e)}></input></td></tr>
                        <tr><td>Block Coeffcient</td><td>------</td><td><input type="number" placeholder={`Default to ${pwrSpecs.block_coeffcient}`}  name="power" onChange={(e)=>handleVesselParameterInput(e)}></input></td></tr>
                    </tbody>
                </table>
            </div>
            <div className="button-section-pwr">
                <button className="button-a" onClick={props.prev}>Go Back</button>
                <button className="button-b" onClick={handleNextSection}>Next Step</button>
            </div>
        </div>
    )
}
export default PowerTrain