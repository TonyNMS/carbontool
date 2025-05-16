import React, {useContext} from "react";
import { ResultContext } from "../App";
import {Line} from 'react-chartjs-2'
import {Chart as ChartJS, CategoryScale, LinearScale, LineElement, PointElement, Title, Tooltip, Legend} from "chart.js";
ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
)
const DutyCycleChart =()=>{
    const Uploaded_Evidence = useContext(ResultContext);
    const dutyCycle = Uploaded_Evidence.duty_cycle_data;
    const x_axis =dutyCycle.map((item)=>item[0]);
    const data = {
        labels:x_axis,
        datasets: [{
            label : 'Duty Cycle ',
            data : dutyCycle.map((item)=>item[1]),
            borderColor: `rgba(15, 8, 150, 1.0)`, 
            backgroundColor: `rgba(15, 8, 150, 1.0)`,
            borderWidth: 4,
            pointRadius:0,
            fill : false,
        }]
    }
    const options ={
        responsive: true,
        plugins: {
            legend: { position: 'top' },
            title: { display: true, text: 'Simulation Data Plot' },
        },
        scales: {
            x: {
                type: 'linear',
                title: { 
                    display: true, text: 'time (s)' },
                ticks:{
                    callback: function(value) {
                        return Math.round(value);
                    },
                    color: 'red'
                }    
            },
            y: { title: { display: true, text: 'Power' },  beginAtZero:true },
        },
    }
        return (
            <div className="dutycycle_chart">
                <div className = "plot-display-container">
                    <Line data ={data} options={options} className="plot-region"></Line>
                </div>
            </div>
        )
}
export default DutyCycleChart