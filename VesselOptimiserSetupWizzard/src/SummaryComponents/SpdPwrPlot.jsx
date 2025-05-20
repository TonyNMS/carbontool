import React, {useContext} from "react";
import { ResultContext } from "../App";
import {Line} from 'react-chartjs-2'
import "../Styling/MiniSpdPwrPlot.css"
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

const SpdPwrPlot =()=>{
    const Uploaded_Evidence = useContext(ResultContext);
    const spdPwrResult = Uploaded_Evidence.speed_power_curve;
    const x_axis  =spdPwrResult.map((item)=>item[0]);

    const data = {
        labels:x_axis,
        datasets: [{
            label : 'Speed vs Power ',
            data : spdPwrResult.map((item)=>item[1]),
            borderColor: `rgba(15, 8, 150, 1.0)`, 
            backgroundColor: `rgba(15, 8, 150,1.0)`,
            borderWidth: 4,
            pointRadius:0,
            
            fill : false,
        }]
    }
    const options ={
        responsive: true,
        plugins: {
            legend: { position: 'top' },
            title: { display: true, text: 'Speed Power Curve' },
        },
        scales: {
            x: {
                type: 'linear',
                title: { 
                    display: true, text: 'Speed (knots)' },
                ticks:{
                    callback: function(value) {
                        return Math.round(value);
                    },
                    color: 'red'
                }    
            },
            y: { title: { display: true, text: 'Power (kWatts)' }, beginAtZero:true},
        },
    }

    return (
        <>
            <Line data ={data} options={options} className="plot-region"></Line>
        </>
    )
}
export default SpdPwrPlot