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
const Summary =()=>{
  
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
                <div className="gauge-container">
                    <MetricDisplay
                        label="Fuel Consumption"
                        value={useContext(ResultContext).fuel_consumption / 1000}
                        unit="Tonnes"
                        formatter={(v) => v.toFixed(2)}
                    />
                </div>
                <div className = "gauge-container">
                    <MetricDisplay
                        label="Total CO₂ Emission"
                        value={useContext(ResultContext).co2_emission / 1000}
                        unit="Tonnes"
                        formatter={(v) => v.toFixed(2)}
                    />
                </div>
                <div className="gauge-container">
                    <MetricDisplay
                        label="Total Hydrogen Consumption"
                        unit = "KG"
                        value={useContext(ResultContext).h2_comsumpution} 
                        fomatter={(v)=>v.toFixed(2)}
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