import React, { useState } from "react";

const ALL_PORTS = [
    {portsName : "Select a port", coords : [53.881352561666105, 8.773538410008562]},
    {portsName : "CUX", coords : [53.881352561666105, 8.773538410008562]},
    {portsName : "NCL", coords : [55.01205910382197, -1.4123295278916768]},
    {portsName : "ROB", coords : [54.63333015759962, 11.323187353329278]},
    {portsName : "GLW", coords : [55.92601372081235, -4.506429187604971]},
]
const DutyCycleSegement_A = ()=>{
    const [segmentData, setSegmentData] = useState()
    const [selectedDepartureCoord, setSelectedDepartureCoord] = useState([]);
    const [selectedArrivalCoord, setSelectedArrivalCoord] = useState([]);
    const [useArrivalPort, setUseArrivalPort] = useState(true);
    
  
    const handleDepartCoord =()=>{

    }
    const handleArrivalCoord =()=>{

    }
    const handleSpeedInput=()=>{

    }
    const handleExpectedTimeInput=()=>{

    }
    
    const displayPortOptions=()=>{
        return ALL_PORTS.map((item, index)=>{
            return <option value={item.coords} index={index}>{item.portsName}</option>
        })
    }
    
    const handleConfirm =()=>{
        const segmentObject = {
            segmentType : "Transfering",
            startCoord : selectedDepartureCoord,
            endCoord : selectedArrivalCoord,
            speed : expectedSpeed,
            time: expectedTime
        }
        setSegmentData(segmentObject)
    }
    
    return(
        <div>   
            
            <div className="input-section">
                {useDepartPort ?
                     <select onChange={e=>setSelectedDepartureCoord(e.target.value)}>{displayPortOptions()}</select> :
                     <>
                        <input className="deptLatInput" type="number" placeholder="Departual Lat"></input>
                        <input className="deptLngInput" type="number" placeholder="Departual Lng"></input>
                     </>
                }
                {useArrivalPort ?
                     <select onChange={e=>setSelectedArrivalCoord(e.target.value)}>{displayPortOptions()}</select> :
                     <>
                        <input className="arrLatInput" type="number" placeholder="Arrival Lat"></input>
                        <input className="arrLngInput" type="number" placeholder="Arrival Lng"></input>
                     </>
                }
                
            </div>
            <div className="speed-duration">
                <input className="arrLatInput" type="number" placeholder="Arrival Lat"/>
                <input className="arrLngInput" type="number" placeholder="Arrival Lng" onChange/>
            </div>
            <button>Edit</button>
            <button>Confirm</button>
        </div>
    )

}
export default DutyCycleSegement_A;