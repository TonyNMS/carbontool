import { createContext, useState } from 'react'
import axios from 'axios'
import './App.css'
import SpdPwrCurve from './DialogBox/SpdPwrCurve';
import DutyCycle from './DialogBox/DutyCycyle';
import PowerTrain from './DialogBox/PowerTrain';
import HistoricalPath from './DialogBox/HistoricalPath';
import Ports from './DialogBox/Ports'
import Modal from 'react-modal'
import GenerateSpdPwr from './Make/GenerateSpdPwr';
import Tags from './Tags';
import { ClipLoader } from 'react-spinners';

const MODEL_STYLE ={
  content: {
    maxWidth: "1000px", 
    maxHeight:"55%",
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
    position:'absolute'
  },
  overlay: {
    backgroundColor: "rgba(122, 117, 117, 0.5)", 
    display: "flex",
    alignItems: "center", 
    justifyContent: "center",
  },
}
export const SetRenderedTags = createContext();
export const SetFinalAnalysisRequest = createContext();
export const ResultContext = createContext();
function App() {


  const [loading, setLoading] = useState(false);
  const [returnedRes, setReturnedRes] = useState(
    {
      duty_cycle_data :[],
      historical_route_data :[],
      speed_power_curve:[],
      fuel_consumption:0,
      co2_emission:0
    }

  );

  const [modelIsOpen, setModelIsOpen] = useState(false);
  const [renderedTags, setRenderedTags] = useState(['Welcome', 'Summary']);

  const toggleSpdPwr = () =>{
    defineRenderedTag("SpdPwr")
  }
  const toggleDutyCycle = () =>{
    defineRenderedTag("DutyCycle")
  }
  const toggleHistroy = () =>{
    defineRenderedTag("History")
  }
  const defineRenderedTag =(input)=>{
    if(renderedTags.includes(input)){
      const newList = renderedTags.filter(item=>item !==input)
      console.log(newList);
      setRenderedTags(renderedTags.filter(item=>item !==input))
    }else{
      const newList = [...renderedTags, input]
      console.log(newList);
      setRenderedTags([...renderedTags, input])
    }
    
  };
  const [finalResquest, setFinalResquest] = useState(
    {
      spd_power : [],
      design_particulars:{
        "length": 29.622,
        "breadth": 8.50,
        "draught": 3.70,
        "block_coefficient": 0.482
      },
      duty_cycle:false,
      historical_route:false,
      ports:true,
      duty_cycle_data :[],
      historical_route_data :[],
      ports_data:["CUX","TYN"],
      
      width:8.5,
      length:28.622,
      block_coeffcient : 0.482,
      draught : 3.7,
    }
  )
  const changedComponentsStats = (input)=>{
    return {
      SpdPwr: input === 'SpdPwr',
      SpdPwrGen: input === 'SpdPwrGen',
      DutyCycle: input === 'DutyCycle',
      PowerTrainConfig: input === 'PowerTrainConfig',
      HistoryPath: input === 'HistoryPath',
      Ports: input === 'Ports'
    }
  }
  const  [componentStats, setComponentStats] = useState({
    'SpdPwr' : false,
    'SpdPwrGen' :false,
    'DutyCycle' : false,
    'PowerTrainConfig' : false,
    'HistoryPath': false,
    'Ports':false
  })
  const display_spdpwr = () => {
    setComponentStats((prevState) => (changedComponentsStats('SpdPwr')));
    setModelIsOpen(true);
  };
  const display_spdpwrgen =() =>{
    setComponentStats((prevState) => (changedComponentsStats('SpdPwrGen')));
  }

  const display_dutycycle = () =>{
    setComponentStats((prevState) => (changedComponentsStats('DutyCycle')));
  }
  const display_historical = () =>{
    setComponentStats((prevState) => (changedComponentsStats('HistoryPath')));
  }
  const display_ports = () =>{
    setComponentStats((prevState) => (changedComponentsStats('Ports')));
  }
  const display_powertrain = ()=>{
    setComponentStats((prevState) => (changedComponentsStats('PowerTrainConfig')));
  }
  const finish_setup = () => {
    setComponentStats(prevState =>
      Object.keys(prevState).reduce((acc, key) => {
        acc[key] = false;
        return acc;
      }, {})
    );
    setModelIsOpen(false);
  };
  const handleSubmissiton = () => {
    setLoading(true);
    axios
    .post('http://127.0.0.1:8000/api/calculate/', finalResquest)
    .then(response=>{
      console.log(JSON.stringify (response.data.estimated_route))
      setReturnedRes(prev=>({...prev, historical_route_data : response.data.estimated_route}))
    })
    .catch(error => {
      console.error('Error uploading request:', error);
    })
    .finally(() => {
      setLoading(false);
    });
  };
  const handleDevbutton = () =>{
    setLoading(true);
    axios
    .then(response=>{
      console.log(response.data.estimated_route)
      setReturnedRes(prev=>({...prev, historical_route_data : response.data.estimated_route}))
      setReturnedRes(prev=>({...prev, duty_cycle_data : response.data.duty_cycle }))
      setReturnedRes(prev=>({...prev, speed_power_curve : response.data.speed_power_curve}))
      setReturnedRes(prev=>({...prev, fuel_consumption : response.data.fuel_consumption}))
      setReturnedRes(prev=>({...prev, co2_emission : response.data.co2_emission}))
    })
    .catch(error => {
      console.error('Error uploading request:', error);
    })
    .finally(() => {
      setLoading(false);
    });
  }
  

  const closeModal = () =>{
    setModelIsOpen(false);
  }
  const renderUseReceptDetail = ()=>{
    switch (finalResquest.provided_evidence){
      case "duty_cycle":
        return(
          <>
            <tr><td>Duty Cycle</td><td>Provided</td></tr>
            <tr><td>Histoical Route</td><td>Not Required</td></tr>
            <tr><td>Ports</td><td>Not Required</td></tr>
          </>
        )
      case "historical_route":
        return(
          <>
            <tr><td>Duty Cycle</td><td>Absent</td></tr>
            <tr><td>Histoical Route</td><td>Provided</td></tr>
            <tr><td>Ports</td><td>Not Required</td></tr>
            <tr><td colSpan={2}>Duty Cycle is Generated base on Historical Route</td></tr>
          </>
        )
      case "ports":
        return(
          <>
            <tr><td>Duty Cycle</td><td>Absent</td></tr>
            <tr><td>Histoical Route</td><td>Absent</td></tr>
            <tr><td>Depature</td><td>{finalResquest.ports_data[0]}</td></tr>
            <tr><td>Arrival</td><td>{finalResquest.ports_data[1]}</td></tr>
            <tr><td colSpan={2}>Duty Cycle is Generated Based on Ports Information</td></tr>
          </>
        )
      default:
        <>
            <tr><td>Duty Cycle</td><td>Absent</td></tr>
            <tr><td>Histoical Route</td><td>Absent</td></tr>
            <tr><td>Depature</td><td>Absent</td></tr>
            <tr><td>Arrival</td><td>Absent</td></tr>
    
        </>
    }
  }
  const renderSpfPwr=()=>{return (componentStats['SpdPwr'] ? <SpdPwrCurve prev = {finish_setup} branch = {display_spdpwrgen} next = {display_dutycycle}></SpdPwrCurve>:null)}
  const renderSSPdPwrGen = ()=>{return(componentStats['SpdPwrGen']? <GenerateSpdPwr prev ={display_spdpwr} next={display_dutycycle}></GenerateSpdPwr>:null)}
  const renderDutyCycle=()=>{return(componentStats['DutyCycle'] ? <DutyCycle prev={display_spdpwr} next = {display_powertrain} branch={display_historical}></DutyCycle> : null)}
  const renderPowerTrain =()=>{return(componentStats['PowerTrainConfig'] ? <PowerTrain prev ={display_dutycycle} next = {finish_setup}></PowerTrain> : null)}
  const renderHistoyPath =()=>{ return(componentStats['HistoryPath'] ? <HistoricalPath prev ={display_dutycycle} branch = {display_ports} next ={display_powertrain}></HistoricalPath> : null)}
  const renderPorts =()=>{return(componentStats['Ports'] ? <Ports prev={display_historical} next ={display_powertrain}></Ports> :null)}
  return ( 
    <div className='app-container'>
        <div className='setup-column'>
          <div className='title-section'><h3>NMS Carbon Calculation Tool</h3></div>
          <div className='tips-prompt'><h5>To Begin, click "Start Setup"</h5></div>
          <div className='button-section'>
            <button onClick={display_spdpwr}>Start Setup</button>
            <button onClick={finish_setup}>Reset</button>
          </div>
          <div className='button-section'>
            <button onClick={toggleSpdPwr}>Speed Power Curve</button>
            <button onClick={toggleDutyCycle}>Duty Cycle</button>
          </div>
          <div className='button-section'>
            <button onClick={toggleHistroy}>Route</button>
            <button onClick={handleDevbutton} disabled={loading}>
              {loading ? (
                  <ClipLoader color="#09f" loading={loading} size={12} />
                ) : (
                  "Dev Button"
                )}
            </button>
          </div>
         
          <div className='infor-record'>
              <table>
                <caption>User Receipt</caption>
                <thead><tr><th>Item</th><th>Value</th></tr></thead>
                <tbody>
                    <tr><td>Speed Power Curve </td><td>{finalResquest.spd_power.length >0 ? "Check" : "Not Provided"}</td></tr>
                    {renderUseReceptDetail()}
                    <tr><td colSpan={2}>-------Vessel Information-------</td></tr>
                    <tr><td>Width</td><td>{finalResquest.width > 0? finalResquest.width : "No Input"}</td></tr>
                    <tr><td>Length</td><td>{finalResquest.length > 0? finalResquest.length : "No Input"}</td></tr>
                    <tr><td>Block Coeffient</td><td>{finalResquest.rated_generator_output > 0? finalResquest.rated_generator_output : "No Input"}</td></tr>
                    <tr><td>Draft</td><td>{finalResquest.fuel_tank_volume > 0? finalResquest.fuel_tank_volume : "No Input"}</td></tr>
                </tbody>
              </table>
          </div>
          <div className = "final-button">
            <button onClick={handleSubmissiton} disabled={loading}>
              {loading ? (
                <ClipLoader color="#09f" loading={loading} size={20} />
              ) : (
                "Submit"
              )}
            </button>
          </div>
        </div>
        <SetFinalAnalysisRequest.Provider value={{setFinalResquest, finalResquest}}>
          <SetRenderedTags.Provider value = {renderedTags}>
            <ResultContext.Provider value = {returnedRes}>
                  <Modal
                      isOpen={modelIsOpen}
                      onRequestClose={closeModal}
                      contentLabel="Task Details"
                      ariaHideApp={false} 
                      style={
                        MODEL_STYLE
                      }>
                      {renderSpfPwr()}
                      {renderSSPdPwrGen()}
                      {renderDutyCycle()}
                      {renderPowerTrain()}
                      {renderHistoyPath()}
                      {renderPorts()}

                  </Modal>
                  <Tags></Tags>
              </ResultContext.Provider>
            </SetRenderedTags.Provider>
        </SetFinalAnalysisRequest.Provider>
        

    </div>
  )
}

export default App
