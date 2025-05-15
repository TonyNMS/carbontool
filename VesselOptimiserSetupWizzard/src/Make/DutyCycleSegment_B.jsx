import React, { useState } from "react";

const ALL_PORTS = [
    {portsName : "Select a port", coords : [53.881352561666105, 8.773538410008562]},
    {portsName : "CUX", coords : [53.881352561666105, 8.773538410008562]},
    {portsName : "NCL", coords : [55.01205910382197, -1.4123295278916768]},
    {portsName : "ROB", coords : [54.63333015759962, 11.323187353329278]},
    {portsName : "GLW", coords : [55.92601372081235, -4.506429187604971]},
]
const DutyCycleSegement_B = ()=>{
    const [segmentData, setSegmentData] = useState()
        
        const [useDeptPort, setUserDeptPort] = useDeptPort(true);
        const [useArrivalPort, setUseArrivalPort] = useState(true);
        const [segementSpeed, setSegmentSpeed] = useState();
        const [segementTimeSpan, setSegmentTimeSpan] = useState;
    
        const [selectedDepartureCoord, setSelectedDepartureCoord] = useState({ lat: "", lng: "" });
        const [selectedArrivalCoord, setSelectedArrivalCoord] = useState({ lat: "", lng: "" });
      
        const handleDepartureLatChange = (latValue) => {
            setSelectedDepartureCoord((prev) => ({
              ...prev,
              lat: latValue,
            }));
        };
        const handleDepartureLngChange = (lngValue) => {
        setSelectedDepartureCoord((prev) => ({
            ...prev,
            lng: lngValue,
        }));
        };
    
        const handleArrivalLatChange = (latValue) => {
        setSelectedArrivalCoord((prev) => ({
            ...prev,
            lat: latValue,
        }));
        };
        const handleArrivalLngChange = (lngValue) => {
        setSelectedArrivalCoord((prev) => ({
            ...prev,
            lng: lngValue,
        }));
        };
    
        const handleSpeedInput=(value)=>{
            setSegmentSpeed(value);
        }
        const handleExpectedTimeInput=(value)=>{
            setSegmentTimeSpan(value);
        }
        
        const displayPortOptions=()=>{
            return ALL_PORTS.map((item, index)=>{
                return <option value={item.coords} index={index}>{item.portsName}</option>
            })
        }
        
        const handleConfirm =()=>{
            const segmentObject = {
                segmentType : "Job",
                startCoord : selectedDepartureCoord,
                endCoord : selectedArrivalCoord,
                speed : expectedSpeed,
                time: expectedTime
            }
            setSegmentData(segmentObject)
        }
        const handleConfirmTransfer =()=>{

        }
        const handleConfirmJob = ()=>{
            
        }
        return(
            <div>   
                
                <div className="input-section">
                    <div className="coords-section">
                        <label>
                            Use Coodinate ? : 
                            <input type="checkbox" onChange={setUserDeptPort(!useDeptPort)}></input>
                        </label>
                        {useDeptPort ?
                            <select onChange={e=>setSelectedDepartureCoord(e.target.value)}>{displayPortOptions()}</select> :
                            <>
                                <input className="deptLatInput" type="number" placeholder="Departual Lat" onChange ={e=>handleDepartureLatChange(e.target.value)}></input>
                                <input className="deptLngInput" type="number" placeholder="Departual Lng" onCHange ={e=>handleDepartureLngChange(e.target.value)}></input>
                            </>
                        }
                        <label>
                            Use Coordinate ? : 
                            <input type="checkbox" onChange={setUseArrivalPort(!useArrivalPort)}></input>
                        </label>
                        {useArrivalPort ?
                            <select onChange={e=>setSelectedArrivalCoord(e.target.value)}>{displayPortOptions()}</select> :
                            <>
                                <input className="arrLatInput" type="number" placeholder="Arrival Lat" onChange = {e=>handleArrivalLatChange(e.target.value)}></input>
                                <input className="arrLngInput" type="number" placeholder="Arrival Lng" onCHange = {e=>handleArrivalLngChange(e.target.value)}></input>
                            </>
                        }
                    </div>
                    <div className="spped-section">
                        <input className="speed-input" type="number" placeholder="Speed in Knots" onChange={e=>handleSpeedInput(e.target.value)}></input>
                    </div>
                    <div className="time-section">
                        <input className="time-input" type="number" placeholder = "Segment duration in minutes" onChange={e=>handleExpectedTimeInput(e.target.value)}></input>
                    </div>
                </div>
                <button>Confirm</button>
            </div>
        )

    
}
export default DutyCycleSegement_B;