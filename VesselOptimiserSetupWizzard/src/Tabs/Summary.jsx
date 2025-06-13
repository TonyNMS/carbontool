import React from "react";
import "../Styling/Summary.css"
import SpdPwrPlot from "../SummaryComponents/SpdPwrPlot";
import DutyCyclePlot from "../SummaryComponents/DutyCyclePlot ";
import MiniMap from "../SummaryComponents/MiniMap";
import Co2PerCaptita from "../SummaryComponents/Co2PerCaptita";
import MetricDisplay from "../SummaryComponents/MetricDisplay";
import { useContext } from "react";
import { ResultContext } from "../App";
const NUMBR_OF_CREW = 8;

const ALL_FUEL =[
    {fuelName:"Marine Diesel", fuelData: "diesel1"},
    {fuelName:"Bio Diesel", fuelData: "diesel2"},
    {fuelName:"Marine Gas Oil", fuelData: "diesel3"},
    {fuelName:"Hydrogen", fuelData:"hydrogen1"},
    {fuelName:"Methonal",fuelData:"methanol1"},
    {fuelName:"Heavy Fuel Oil", fuelData: "diesel4"}
]
const Summary =()=>{
    
    const all_fuel_collection = useContext(ResultContext).fuel_consumption;
    const fetech_fuel_name = (input)=>{
        let res = "Undefined";
        ALL_FUEL.map((item, index)=>{
          if (item.fuelData === input){
            res = item.fuelName;
          }
        })
        return res;
    }
    const renderMetricsDisplay = () =>{
        console.log("Rendereing Mertics Display");
        return (
            Object.entries(all_fuel_collection).map(
                ([fuelType, amount])=>
                    <div className="gauge-container">
                        {console.log(fetech_fuel_name(fuelType))}
                        {console.log(amount)}
                        <MetricDisplay
                            label={fetech_fuel_name(fuelType)}
                            value={fuelType.includes("hydrogen")? amount / 1000 : amount / 100}
                            unit ={"Tonnes"}>
                        </MetricDisplay>
                    </div>
                
            )
        )
    }
  
    return(
        <div className="summary-section">
         
            <div className="summary-column left">
                <div className="plot-container">
                    <SpdPwrPlot></SpdPwrPlot>
                </div>
                <div className="plot-container">
                    <DutyCyclePlot></DutyCyclePlot>
                </div>
            </div>

         
            <div className="summary-column middle">
              <MiniMap></MiniMap>
            </div>

           
            <div className="summary-column right">
                
                {renderMetricsDisplay()}
                <div className = "gauge-container">
                    <MetricDisplay
                        label="Total CO₂ Emission"
                        value={useContext(ResultContext).co2_emission / 1000}
                        unit="Tonnes"
                    />
                </div>
               <div className="table-container">
                    <Co2PerCaptita crewCount={NUMBR_OF_CREW}/>
               </div>

            </div>
        </div>
    )
}

export default Summary;

/**
 * <table>
        <thead>
            <tr><th></th><th colSpan={2}>Calculation Summary</th></tr>
        </thead>
        <tbody>
            <tr><td rowSpan={6} className="vertical-text-g2">Vessel Infromation</td><td className="title-column-g2">Vessel Name</td><td className="value-columne">Prince Madog</td></tr>
            <tr><td className="title-column-g2">Vessel Age (yrs)</td><td className="value-columne">12</td></tr>
            <tr><td className="title-column-g2">Vessel Owner </td><td className="value-columne">OSE</td></tr>
            <tr><td className="title-column-g2">Vessel Length (m)</td><td className="value-columne">{vessel_input.finalResquest.design_particulars.length}</td></tr>
            <tr><td className="title-column-g2">Vessel Breadth (m)</td><td className="value-columne">{vessel_input.finalResquest.design_particulars.breadth}</td></tr>
            <tr><td className="title-column-g2">Vessel Draught (m)</td><td className="value-columne">{vessel_input.finalResquest.design_particulars.draught}</td></tr>
            <tr><td rowSpan = {2} className="vertical-text-g3">Carbon Summary</td><td className="title-column-g3">Total Fuel Consumption (ton)</td><td className="value-columne">{(res_fuel/1000).toFixed(2)}</td></tr>
            <tr><td className="title-column-g3">Total Carbon Emission (ton)</td><td className="value-columne">{(res_co2/1000).toFixed(2)}</td></tr>
        </tbody>
    </table>
 */