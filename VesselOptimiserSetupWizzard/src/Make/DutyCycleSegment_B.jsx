import React, { useState } from "react";

const ALL_FUEL =[
    {fuelName:"Select a fuel", fuelData: "diesel1"},
    {fuelName:"Marine Diesel", fuelData: "diesel1"},
    {fuelName:"Bio Diesel", fuelData: "diesel2"},
    {fuelName:"Marine Gas Oil", fuelData: "diesel3"},
    {fuelName:"Hydrogen", fuelData:"hydrogen1"},
    {fuelName:"Methonal",fuelData:"methanol1"},
    {fuelName:"Heavy Fuel Oil", fuelData: "diesel4"}
]

const DutyCycleSegementB = ({segmentData, onChange})=>{
    console.log ("DutyCycleSegmentB is rendering for Segment ID" , segmentData.id);
    const{
        segmentType,
        segmentPower,
        segmentTimeSpam,
        fuel,
    }= segmentData;

    const handlePowerInput =(value)=>{
        onChange({...segmentData, segmentPower : value})
    }
    const handleTimeInput =(value)=>{
        onChange({...segmentData, segmentTimeSpam : value})
    }
    const renderAllFuelOptions =()=>{
        return(
            ALL_FUEL.map((item, index)=>
            <option key={`fuel_option_${index}`} value = {item.fuelData}>{item.fuelName}</option>)
        )
    }
    const handleSelectFuelOptions = (e)=>{
        onChange({...segmentData, fuel: e.target.value})
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
            <div>
                <label>Select A Fuel :  </label>
                <select onChange={e=>handleSelectFuelOptions(e)}>{renderAllFuelOptions()}</select>
            </div>
        </div>
    
    )

    
}
export default DutyCycleSegementB;