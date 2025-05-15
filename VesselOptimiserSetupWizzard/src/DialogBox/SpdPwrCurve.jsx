import React, { useState, useCallback, useContext, use} from "react";
import {useDropzone} from "react-dropzone"
import { SetFinalAnalysisRequest } from "../App";
import "../Styling/SpdPwr.css"

function SpdPwrCurve (props){
    const [haveSpdCurve, setSpdCurve] = useState(false);
    const [csvName, setCSVName] = useState("");
    const spdPwrCurveContext = useContext(SetFinalAnalysisRequest);
    const onDrop = useCallback(
        (droppedCSV)=>{
            const csvFile = droppedCSV[0];
            if(droppedCSV.length>0 && csvFile.name.split('.').pop()==='csv'){
                const reader = new FileReader();
                
                reader.onload=()=>{
                    const csvText = reader.result;
                    const rows = csvText.trim().split('\n');
                    const formattedData = rows
                    .map(row => {
                        const columns = row.split(',').map(val => val.trim());
                        if (columns.length === 2) {
                            return [Number(columns[0]),Number(columns[1])/1000];
                        }
                        return null;                     
                    })
                    console.log(JSON.stringify(formattedData));
                    spdPwrCurveContext.setFinalResquest(prev=>({...prev, spd_power : formattedData}))
                }
                setCSVName(csvFile.name);
                setSpdCurve(true);
                
                
            }else{
                alert('Please upload a .csv file');
            }
        },[]
    );
    const {getRootProps, getInputProps, isDragActive} = useDropzone(
        {
            onDrop,
            accept: {
                'text/csv': ['.csv'],
                'application/vnd.ms-excel': ['.csv']
            }
        }
    )
    const handleCheckboxChange = (event) => {
        if (event.target.checked) {
            setSpdCurve(false);
            spdPwrCurveContext.setFinalResquest(prev=>({...prev, spd_power : []}))
            setCSVName("");
        }
    };
   
    return (
        <div className = "spdPwrCurve-section">
            <h3>About Vessel Speed Power Curve</h3>
            <div className="subtitle-section">
                <label>Do you have vessel Speed Power Curve?</label>
            </div>
            <div className='drop-zone-wrapper'>
                <div {...getRootProps()} className ="dropzone">
                    <input {...getInputProps()}></input>
                    {isDragActive? 
                        <p>Drop you file here</p>:
                        <p>Upload Speed Power Curve:{csvName===""? "None" : csvName}</p>
                    }
                </div>
            </div>
            <div className="deny-toggle">
                <label>I do not have a Speed Power Curve</label>
                <input type="checkbox" onChange={handleCheckboxChange}></input>
            </div>
            <div className="status-summary">
                <p>Provided Speed Power Curve ? -----------{haveSpdCurve? "True":"None"}</p>
                <p>Uploaded File Name -----------{haveSpdCurve && csvName !="" ? csvName:"None"}</p>
            </div>
            <div className="button-section-spd">
                <button className='button-a' onClick={props.prev}>Restart Setup</button>
                <button className='button-b' onClick={props.next}>Next Step</button>
            </div>
        </div>
    )
}
export default  SpdPwrCurve