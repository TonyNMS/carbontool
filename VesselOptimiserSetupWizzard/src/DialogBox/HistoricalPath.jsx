import React, { useState, useCallback,useContext } from "react";
import {useDropzone} from "react-dropzone"
import { SetFinalAnalysisRequest } from "../App";
import "../Styling/HistoricalPath.css"

function HistoricalPath (props){
    const [hashistroyPath, setHasHistroyPath] = useState(false);
    const [csvName, setCSVName] = useState("");
    const FINAL_REQUEST = useContext(SetFinalAnalysisRequest);
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
                            return [Number(columns[0]),Number(columns[1])];
                        }
                        return null; 
                    })
                   
                    FINAL_REQUEST.setFinalResquest(prev=>({...prev,  provided_evidence : "historical_route", historical_route:true, historical_route_data :formattedData}));
                }
                reader.readAsText(csvFile);
                setCSVName(csvFile.name);
                setHasHistroyPath(true);
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
            setHasHistroyPath(false);
            FINAL_REQUEST.setFinalResquest(prev=>({...prev,  provided_evidence : "", historical_route:false, historical_route_data :[]}));
            setCSVName("");
        }
    };
    return(
        <div className="histroical-path-section">
            <h3>About Vessel's Historical Route</h3>
            <div className="selectuon-section">
                <label>We will need on example of your historical path if duty cycle can not be provided</label>
            </div>
            <div className='drop-zone-wrapper'>
                <div {...getRootProps()} className ="dropzone">
                    <input {...getInputProps()}></input>
                    {isDragActive? 
                        <p>Drop you file here</p>:
                        <p>Upload Duty Cycle:{csvName===""? "None" : csvName}</p>
                    }
                </div>
            </div>
            <div className="deny-toggle">
                <label>I do not currently have a histroical Route file</label>
                <input type="checkbox" onChange={handleCheckboxChange}></input>
            </div>
            <div className="status-summary">
                <p>Provided Historical Route ? -----------{hashistroyPath? "True":"None"}</p>
                <p>Uploaded File Name -----------{hashistroyPath && csvName !="" ? csvName:"None"}</p>
            </div>        
            <div className="button-section-dc">
                <button className="button-a" onClick={props.prev}>Go Back</button>
                <button className="button-b" onClick={hashistroyPath ? props.next : props.branch}>Next Step</button>
            </div>
        </div>
    )
}
export default HistoricalPath