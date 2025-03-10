import React, { useState, useCallback, useContext } from "react";
import {useDropzone} from "react-dropzone";
import { SetFinalAnalysisRequest } from "../App";
import "../Styling/DutyCycle.css";

const FAKE_DATA_DUTYCYCLE = [
    [0,0],
    [1,1],
    [2,8],
    [3,9],
    [4,64]
]
function DutyCycle (props) {
    const [haveDutyCycle, setHaveDutyCycle] = useState(false);
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
                    console.log(formattedData);
                    FINAL_REQUEST.setFinalResquest(prev=>({...prev, duty_cycle:true, duty_cycle_data :formattedData}));
                    
                }
                reader.readAsText(csvFile);
                setCSVName(csvFile.name);
                setHaveDutyCycle(true);
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
            setHaveDutyCycle(false);
            FINAL_REQUEST.setFinalResquest(prev=>({...prev, duty_cycle:false, duty_cycle_data :[]}));
            setCSVName("");
        }
    };
    return(
        <div className="dutycycle-section">
            <h3>About Vessel's Duty Cycle</h3>
            <div className="selectuon-section">
                <label>Do you have vessel Duty Cycle?</label>
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
                <label>I do not currently have a Duty Cycle CSV file</label>
                <input type="checkbox" onChange={handleCheckboxChange}></input>
            </div>
            <div className="status-summary">
                <p>Provided Duty Cycle? -----------{haveDutyCycle? "True":"None"}</p>
                <p>Uploaded File Name -----------{haveDutyCycle && csvName !="" ? csvName:"None"}</p>
            </div>
            <div className="button-section-dc">
                <button className="button-a" onClick={props.prev}>Go Back</button>
                <button className="button-b" onClick={haveDutyCycle? props.next : props.branch}>Next Step</button>
            </div>
        </div>
    )
}

export default DutyCycle