import React, { useState } from "react";


const DutyCycleSegementB = ({segmentData, onChange})=>{
    console.log ("DutyCycleSegmentB is rendering for Segment ID" , segmentData.id);
    const{
        segmentType,
        segmentPower,
        segmentTimeSpam,
    }= segmentData;
    const handlePowerInput =(value)=>{
        onChange({...segmentData, segmentPower : value})
    }
    const handleTimeInput =(value)=>{
        onChange({...segmentData, segmentTimeSpam : value})
    }

    return(
        <div className="input-section" style={{ border: "1px solid #ccc", padding: "8px" }}>
            <h4>{segmentType} Segment</h4>
            <div>
                <lable>Estimated Power Usage (kW): </lable>
                <input
                type="number"
                placeholder="Estimated Power (kWatt)"
                value={segmentPower}
                onChange={(e) => handlePowerInput(e.target.value)}
                />
            </div>
            <div>
                <label>Duration (Hours): </label>
                <input
                type="number"
                placeholder="Segment Duration (Hours)"
                value={segmentTimeSpam}
                onChange={(e) => handleTimeInput(e.target.value)}
                />
            </div>
        </div>
    
    )

    
}
export default DutyCycleSegementB;