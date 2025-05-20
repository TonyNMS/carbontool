import React, {useContext} from "react";
import { ResultContext } from "../App";
//CO₂
const Co2PerCaptita =(props)=>{
    const value = useContext(ResultContext).co2_emission/1000;
    const time_collection = useContext(ResultContext).duty_cycle_data.map((item)=>item[0] / 3600);
    const total_time_hr = time_collection[time_collection.length - 1];
    const co2_per_person_per_trip = value / props.crewCount;
    const co2_per_person_per_day  = value / (total_time_hr/24)/ props.crewCount; 
    const co2_per_person_per_hour = (value / total_time_hr / props.crewCount) * 1000;

    
    return(
        <div className ={'crew-co2-summary-section'}>
            <table>
                <caption>Crew CO₂ Summary</caption>
                <thead><tr><th>Categoty</th><th>Value</th></tr></thead>
                <tbody>
                    <tr><td>CO₂ per Person</td><td>{co2_per_person_per_trip.toFixed(2)} Tonnes</td></tr>
                    <tr><td>CO₂ per Person per Day</td><td>{co2_per_person_per_day.toFixed(2)} Tonnes</td></tr>
                    <tr><td>CO₂ per Person per Hour</td><td>{co2_per_person_per_hour.toFixed(2)} KG</td></tr>
                </tbody>
            </table>
        </div>
    )
}
export default Co2PerCaptita;