import React, { useState, useContext } from "react";
import "../Styling/Ports.css"
import { SetFinalAnalysisRequest } from "../App";
const PORT_LIST = [
    "TYN",
    "GLW",
    "SCA",
    "ABD",
    "CUX",
    "SAS"
]
function Ports (props){
    const [hasPorts, setHasPorts] = useState(false);
    const [startPort, setStartPort] = useState("");
    const [endPort, setEndPort] = useState("");
    const finslResultContext = useContext(SetFinalAnalysisRequest);

    const handleDeptPortInput =(input)=>{
        setStartPort(input)
        endPort === "" ? null : setHasPorts(true)
    }
    const handleArrivalPortInput =(input)=>{
        setEndPort(input)
        startPort === "" ? null : setHasPorts(true)
    }
    const handleNextStep =()=>{
        finslResultContext.setFinalResquest(prev=>({...prev,  provided_evidence : "ports", ports:true, ports_data :[startPort, endPort]}));
        return(
            hasPorts? props.next() : alert("need to input port")
        )
    }

    const handleSelectDeptPort =(e)=>{
        setStartPort(e.target.value);
        endPort === "" ? null : setHasPorts(true);
    }
    const handleSelectArrPort =(e)=>{
        setEndPort(e.target.value);
        startPort === "" ? null : setHasPorts(true);
    }
    const renderPortsOptions =() =>{
        return(
            PORT_LIST.map((item , index)=>
                <option key={`port_option_${index}`} value = {item}>{item}</option>
            )
        )
    }
    return(
        <div className="ports-section">
            <h3>About Vessel's Ports</h3>
            <div className="selectuon-section">
                <label>We will need on example of your Star and end Ports if histroical path can not be provided</label>
            </div>
            <div className="input-section">
                <div className="input-section-child">
                    <label>
                        Select a Departure Port :
                        <select onChange ={e=>handleSelectDeptPort(e)} defaultValue="NCL">{renderPortsOptions()}</select>
                    </label>
                </div>
                <div className="input-section-child">
                    <label>
                        Select a Arrival Port :
                        <select onChange ={e=>handleSelectArrPort(e)} defaultValue="GLW">{renderPortsOptions()}</select>
                    </label>
                </div>      
            </div>
            <div className="status-summary">
                <p>Provided Depature Port ? -----------{startPort ===""? "No Input":startPort}</p>
                <p>Uploaded Arrival Port ? -------------{endPort===""? "No Input":endPort}</p>
                <p>Condition Fulfilled ? -------------{hasPorts? "DONE" : "INCOMPLETE"}</p>
            </div>
            <div className="button-section-ports">
                <button className="button-a" onClick={props.prev}>Go Back</button>
                <button className="button-b" onClick={handleNextStep}>Next Step</button>
            </div>
        </div>
    )
}
export default Ports;