import React, { useContext } from "react";
import { ResultContext , SetFinalAnalysisRequest} from "../App";
import "../Styling/Summary.css"
const Summary =()=>{
    const res = useContext(ResultContext);
    const vessel_input = useContext(SetFinalAnalysisRequest)
    const res_co2 = Number(res.co2_emission)
    const res_fuel =Number(res.fuel_consumption)
    const res_route = res.generated_route_data
    return(
        <div className="summary-section">
            
            <table>
                <thead>
                    <tr><th></th><th colSpan={2}>Calculation Summary</th></tr>
                </thead>
                <tbody>
                    <tr><td rowSpan={3} className="vertical-text-g1">General Informmation</td><td className="title-column-g1">PlaceHolder1</td><td className="value-columne">{res_co2.toFixed(2)}</td></tr>
                    <tr><td className="title-column-g1"> PlaceHolder2</td><td className="value-columne">{res_fuel.toFixed(2)}</td></tr>
                    <tr><td className="title-column-g1">PlaceHolder3</td><td className="value-columne">{res_fuel.toFixed(2)}</td></tr>
                    <tr><td rowSpan={6} className="vertical-text-g2">Vessel Infromation</td><td className="title-column-g2">Vessel Name</td><td className="value-columne">Prince Madog</td></tr>
                    <tr><td className="title-column-g2">Vessel Age (yrs)</td><td className="value-columne">12</td></tr>
                    <tr><td className="title-column-g2">Vessel Owner </td><td className="value-columne">OSE</td></tr>
                    <tr><td className="title-column-g2">Vessel Length (m)</td><td className="value-columne">{vessel_input.finalResquest.design_particulars.length}</td></tr>
                    <tr><td className="title-column-g2">Vessel Breadth (m)</td><td className="value-columne">{vessel_input.finalResquest.design_particulars.breadth}</td></tr>
                    <tr><td className="title-column-g2"> Vessel Draught (m)</td><td className="value-columne">{vessel_input.finalResquest.design_particulars.draught}</td></tr>
                    <tr><td rowSpan = {2} className="vertical-text-g3">Carbon Summary</td><td className="title-column-g3">Total Fuel Consumption (ton)</td><td className="value-columne">{(res_fuel/1000).toFixed(2)}</td></tr>
                    <tr><td className="title-column-g3">Total Carbon Emission (ton)</td><td className="value-columne">{(res_co2/1000).toFixed(2)}</td></tr>
                </tbody>
            </table>
            

        </div>
    )
}

export default Summary;