import React, { useState, useCallback, useContext } from "react";
import {useDropzone} from "react-dropzone";
import { SetFinalAnalysisRequest } from "../App";
import "../Styling/DutyCycle.css";
import Modal from 'react-modal'
import GenerateDutyCycle from "../Make/GenerateDutyCycle";
import ConfigDutyCycle from "../Make/ConfigDutyCyle";
const FAKE_DATA_DUTYCYCLE = [
    [0,0],
    [1,1],
    [2,8],
    [3,9],
    [4,64]
]
const MODEL_STYLE = {
    content: {
      maxWidth: "1000px",
      maxHeight: "55%",
      height: "auto",
      margin: "auto",
      borderRadius: "8px",
      padding: "15px",
      backgroundColor: "white",
      color: "black",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "flex-start",
      textAlign: "center",
      boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.08)",
      position: 'absolute',
      zIndex: 4000
    },
    overlay: {
      backgroundColor: "rgba(122, 117, 117, 0.5)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      zIndex: 2500,
    },
}
function DutyCycle (props) {
    const [haveDutyCycle, setHaveDutyCycle] = useState(false);
    const [csvName, setCSVName] = useState("");
    const FINAL_REQUEST = useContext(SetFinalAnalysisRequest);
    const [modalIsOpen, setModelIsOpen] = useState(false);
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
    const handleGenDutyCheckBox = (event)=>{
        if (event.target.checked){
            setModelIsOpen(true);
        }
        
    }
    const closeModal = () => {
        setModelIsOpen(false);
      }
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
            <div className="dutycycle-gen-toggle">
                <label>I wish to Construct a Duty Cycle</label>
                <input type="checkbox" checked={modalIsOpen} onChange ={handleGenDutyCheckBox}></input>
            </div>
            <div className="status-summary">
                <p>Provided Duty Cycle? -----------{haveDutyCycle? "True":"None"}</p>
                <p>Uploaded File Name -----------{haveDutyCycle && csvName !="" ? csvName:"None"}</p>
            </div>
            <div className="button-section-dc">
                <button className="button-a" onClick={props.prev}>Go Back</button>
                <button className="button-b" onClick={haveDutyCycle? props.next : props.branch}>Next Step</button>
            </div>
            <Modal
                isOpen={modalIsOpen}
                onRequestClose={closeModal}
                contentLabel="DutyCycleGeneration"
                ariaHideApp={false}
                style={
                  MODEL_STYLE
                }>
                <ConfigDutyCycle></ConfigDutyCycle>
            </Modal>
        </div>
    )
}

export default DutyCycle