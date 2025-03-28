import React, { useState } from "react";

const ALL_PORTS = [
    {portsName : "CUX", coords : []},
    {portsName : "NCL", coords : []},
    {portsName : "ROB", coords : []},
    {portsName : "CUX", coords : []},
]
const DutyCycleSegement_B = ()=>{
    const selectedSegmentType = useState("");
    const selectedDepartureCoord = useState([]);
    const selectedArrialCoord = useState([]);
    const selectedStartPort = useState("CUX");
    const selectedEndPort = useState("NCL")
    const distance = useState(0);
    const expectedTime = useState(0);
    

    return (
        <div>
            <button>Confirm</button>
            <button>Remove</button>
        </div>
    )

    
}
export default DutyCycleSegement_B;