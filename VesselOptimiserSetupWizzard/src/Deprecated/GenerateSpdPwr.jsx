import React, { useState, useContext } from "react";
import {SetFinalAnalysisRequest} from "../App"
import "../Styling/SpdPwrGen.css"
const FAKE_DATA_PWRSPD = [
    [0,0],
    [1,1],
    [2,8],
    [3,9],
    [4,64]
]

function GenerateSpdPwr (props){
    const [spdPwrRequest, setSpdPwrRequest] = useState({
        vessel_length : 0,
        vessel_width : 0,
        vessel_tonnage : 0,
        vessel_displacement: 0,
        vessel_rated_pwr_output : 0,
        vessel_propellor_count : 0
    })
    const FINAL_REQUEST = useContext(SetFinalAnalysisRequest)
    const handleSpdpwrRequest =(e)=>{
        setSpdPwrRequest((prev)=>({...prev , [e.target.name] : e.target.value}))
    }
    const checkALlInputDone =()=>{
        return Object.values(spdPwrRequest).every(value => Number(value) !== 0);
    }
   
    const handleSpdPwrCurveSubmission =()=>{
        if (Object.values(spdPwrRequest).every(value => Number(value) !== 0)){
            FINAL_REQUEST.setFinalResquest(prev=>({...prev, spd_power : FAKE_DATA_PWRSPD}));
        }else{
            alert("Submision Failed, Fields Incomplete")
        }
    }
    return(
        <div className="gen-spd-pwr">
            <h3> Approximate A Speed Power Curve </h3>
            <div className="selectuon-section">
                <label>We Will Need You Vessel Dimension </label>
            </div>
            <div className="input-section">
                <div className="input-section-child">
                    <label>Vessel Length:</label>
                    <input placeholder="Input Vessel Length" type="number" name = "vessel_length" onChange={(e=>handleSpdpwrRequest(e))}></input>
                </div>
                <div className="input-section-child">
                    <label>Vessel Width: </label>
                    <input placeholder="Input Vessel Width" type ="number" name = "vessel_width" onChange={(e=>handleSpdpwrRequest(e))}></input>
                </div>
                <div className="input-section-child">
                    <label>Vessel Tonnage:</label>
                    <input placeholder="Input Vessel Width" type ="number" name = "vessel_tonnage" onChange={(e=>handleSpdpwrRequest(e))}></input>
                </div>
                <div className="input-section-child">
                    <label>Vessel Displacement:</label>
                    <input placeholder="Input Vessel Width" type ="number" name = "vessel_displacement" onChange={(e=>handleSpdpwrRequest(e))}></input>
                </div>
                <div className="input-section-child">
                    <label>Vessel Rated Power Output:</label>
                    <input placeholder="Input Vessel Width" type ="number" name = "vessel_rated_pwr_output" onChange={(e=>handleSpdpwrRequest(e))}></input>
                </div>
                <div className="input-section-child">
                    <label>Vessel Propellor Count:</label>
                    <input placeholder="Input Vessel Width" type ="number" name = "vessel_propellor_count" onChange={(e=>handleSpdpwrRequest(e))}></input>
                </div>

            </div>
            <div className="status-summary">
                <p>Provided Vessel Length ? -----------{spdPwrRequest.vessel_length ==0? "No Input":`${spdPwrRequest.vessel_length} m`}</p>
                <p>Provided Veesel Width? -------------{spdPwrRequest.vessel_width==0? "No Input":`${spdPwrRequest.vessel_width} m`}</p>
                <p>Provided Vessel Tonnage ? -------------{spdPwrRequest.vessel_tonnage==0? "No Input":`${spdPwrRequest.vessel_tonnage} ton`}</p>
                <p>Provided Vessel Displacement ? -------------{spdPwrRequest.vessel_displacement==0? "No Input":`${spdPwrRequest.vessel_displacement} ton`}</p>
                <p>Provided Vessel Rated Power Output ? -------------{spdPwrRequest.vessel_rated_pwr_output==0? "No Input":`${spdPwrRequest.vessel_rated_pwr_output} kw`}</p>
                <p>provided Vessel Propellor Count ? -------------{spdPwrRequest.vessel_propellor_count==0? "No Input":`${spdPwrRequest.vessel_rated_pwr_output}`}</p>
                <p>Condition Fulfilled ? -------------{checkALlInputDone()? "DONE" : "INCOMPLETE"}</p>
            </div>
            <div className="button-section-ports">
                <button className="button-a" onClick={props.prev}>Go Back</button>
                <button className="button-b" onClick={props.next}>Next Step</button>
                <button onClick={handleSpdPwrCurveSubmission}>Submit</button>
            </div>
        </div>
    )
 }
 export default GenerateSpdPwr