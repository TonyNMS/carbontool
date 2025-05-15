import { createContext, useState } from 'react'
import axios from 'axios'
import './App.css'
import SpdPwrCurve from './DialogBox/SpdPwrCurve';
import DutyCycle from './DialogBox/DutyCycyle';
import PowerTrain from './DialogBox/PowerTrain';
import HistoricalPath from './DialogBox/HistoricalPath';
import Ports from './Deprecated/Ports'
import Modal from 'react-modal'
import GenerateSpdPwr from './Deprecated/GenerateSpdPwr';
import Tags from './Tags';
import { ClipLoader } from 'react-spinners';
import Season from './DialogBox/Season';


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
export const SetRenderedTags = createContext();
export const SetFinalAnalysisRequest = createContext();
export const ResultContext = createContext();
function App() {


  const [loading, setLoading] = useState(false);
  const [returnedRes, setReturnedRes] = useState(
    {
      duty_cycle_data: [],
      generated_route_data: [],
      speed_power_curve: [],
      fuel_consumption: 0,
      co2_emission: 0
    }

  );

  const [modelIsOpen, setModelIsOpen] = useState(false);
  const [renderedTags, setRenderedTags] = useState(['Welcome', 'Summary', "SpdPwr", "History", "DutyCycle", "NewWidget"]);

  const toggleSpdPwr = () => {
    defineRenderedTag("SpdPwr")
  }
  const toggleDutyCycle = () => {
    defineRenderedTag("DutyCycle")
  }
  const toggleHistroy = () => {
    defineRenderedTag("History")
  }
  const defineRenderedTag = (input) => {
    if (renderedTags.includes(input)) {
      const newList = renderedTags.filter(item => item !== input)
      console.log(newList);
      setRenderedTags(renderedTags.filter(item => item !== input))
    } else {
      const newList = [...renderedTags, input]
      console.log(newList);
      setRenderedTags([...renderedTags, input])
    }

  };
  const [finalResquest, setFinalResquest] = useState(
    {
      spd_power: [],
      design_particulars: {
        "length": 29.622,
        "breadth": 8.50,
        "draught": 3.70,
        "block_coefficient": 0.482
      },
      duty_cycle: false,
      duty_cycle_data: [],
      dutycycle_config : false,
      dc_config_data:[],
      season : "Summer",
      historical_route: false,
      historical_route_data: [],
    }
  )
  const [devResquest, setDevResquest] = useState(
    {
      spd_power: [],
      design_particulars: {
        "length": 29.622,
        "breadth": 8.50,
        "draught": 3.70,
        "block_coefficient": 0.482
      },
      duty_cycle: false,
      historical_route: false,
      ports: true,
      duty_cycle_data: [],
      historical_route_data: [],
      ports_data: ["TYN", "CUX"],
    }
  )
  const changedComponentsStats = (input) => {
    return {
      SpdPwr: input === 'SpdPwr',
      SpdPwrGen: input === 'SpdPwrGen',
      DutyCycle: input === 'DutyCycle',
      PowerTrainConfig: input === 'PowerTrainConfig',
      HistoryPath: input === 'HistoryPath',
      Ports: input === 'Ports',
      Season: input === 'Season'
    }
  }
  const [componentStats, setComponentStats] = useState({
    'SpdPwr': false,
    'SpdPwrGen': false,
    'DutyCycle': false,
    'PowerTrainConfig': false,
    'HistoryPath': false,
    'Ports': false,
    'Season' :false
  })
  const display_spdpwr = () => {
    setComponentStats((prevState) => (changedComponentsStats('SpdPwr')));
    setModelIsOpen(true);
  };
  const display_spdpwrgen = () => {
    setComponentStats((prevState) => (changedComponentsStats('SpdPwrGen')));
  }

  const display_dutycycle = () => {
    setComponentStats((prevState) => (changedComponentsStats('DutyCycle')));
  }
  const display_historical = () => {
    setComponentStats((prevState) => (changedComponentsStats('HistoryPath')));
  }
  const display_ports = () => {
    setComponentStats((prevState) => (changedComponentsStats('Ports')));
  }
  const display_season = () =>{
    setComponentStats((prevState)=>(changedComponentsStats('Season')));
  }
  const display_powertrain = () => {
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

    console.log(finalResquest.duty_cycle_data)

    axios
      .post('http://127.0.0.1:8000/api/calculate/', finalResquest)
      .then(response => {

        console.log(`fuel consumtion: ${response.data.fuel_consumption}`)
        console.log(`all res : ${JSON.stringify(response.data)}`)
        if (response.data.estimated_route) {
          setReturnedRes(prev => ({ ...prev, generated_route_data: response.data.estimated_route }))
        }

        setReturnedRes(prev => ({ ...prev, duty_cycle_data: response.data.duty_cycle }))
        setReturnedRes(prev => ({ ...prev, speed_power_curve: response.data.speed_power_curve }))
        setReturnedRes(prev => ({ ...prev, fuel_consumption: response.data.fuel_consumption }))
        setReturnedRes(prev => ({ ...prev, co2_emission: response.data.co2_emission }))
      })
      .catch(error => {
        console.error('Error uploading request:', error);
      })
      .finally(() => {
        setLoading(false);
      });
  };
  const handleDevbutton = () => {
    setLoading(true);

    axios
      .post('http://127.0.0.1:8000/api/calculate/', devResquest)
      .then(response => {

        console.log(`fuel consumtion: ${response.data.fuel_consumption}`)
        console.log(`co2 emisstion : ${response.data.co2_emission}`)
        if (response.data.estimated_route) {
          setReturnedRes(prev => ({ ...prev, generated_route_data: response.data.estimated_route }))
        }
        setReturnedRes(prev => ({ ...prev, duty_cycle_data: response.data.duty_cycle }))
        setReturnedRes(prev => ({ ...prev, speed_power_curve: response.data.speed_power_curve }))
        setReturnedRes(prev => ({ ...prev, fuel_consumption: response.data.fuel_consumption }))
        setReturnedRes(prev => ({ ...prev, co2_emission: response.data.co2_emission }))
      })
      .catch(error => {
        console.error('Error uploading request:', error);
      })
      .finally(() => {
        setLoading(false);
      });
  }

  const handleDevButton2 =()=>{
    console.log(JSON.stringify(finalResquest));
  }


  const closeModal = () => {
    setModelIsOpen(false);
  }

  const renderUseReceptDetail = () => {
    let dutycycle_hint
    let historical_route_hint
    let ports_hint
    
    finalResquest.duty_cycle ? dutycycle_hint = <tr><td>Duty Cycle</td><td>Provided</td></tr> : dutycycle_hint = <tr><td>Duty Cycle</td><td>Absent</td></tr>
    finalResquest.historical_route ? historical_route_hint = <tr><td>Histoical Route</td><td>Provided</td></tr> : historical_route_hint = <tr><td>Histoical Route</td><td>Absent</td></tr>
    finalResquest.ports ? ports_hint = <tr><td>Ports</td><td>Provided</td></tr> : ports_hint = <tr><td>Ports</td><td>Absent</td></tr>
    return (
      <>
        {dutycycle_hint}
        {historical_route_hint}
        {ports_hint}
      </>
    )

  }
  const renderSpfPwr = () => { return (componentStats['SpdPwr'] ? <SpdPwrCurve prev={finish_setup} branch={display_spdpwrgen} next={display_dutycycle}></SpdPwrCurve> : null) }
  const renderSSPdPwrGen = () => { return (componentStats['SpdPwrGen'] ? <GenerateSpdPwr prev={display_spdpwr} next={display_dutycycle}></GenerateSpdPwr> : null) }
  const renderDutyCycle = () => { return (componentStats['DutyCycle'] ? <DutyCycle prev={display_spdpwr} next={display_powertrain} branch={display_historical}></DutyCycle> : null) }
  const renderPowerTrain = () => { return (componentStats['PowerTrainConfig'] ? <PowerTrain prev={display_dutycycle} next={display_season}></PowerTrain> : null) }
  const renderHistoyPath = () => { return (componentStats['HistoryPath'] ? <HistoricalPath prev={display_dutycycle} branch={display_powertrain} next={display_powertrain}></HistoricalPath> : null) }
  //const renderPorts = () => { return (componentStats['Ports'] ? <Ports prev={display_historical} next={display_powertrain}></Ports> : null) }
  const renderSeasons = ()=> {return (componentStats['Season'] ? <Season prev={display_powertrain} next={finish_setup}></Season> :null)};
  return (
    <div className='app-container'>
      <div className='setup-column'>
        <div className='title-section'><h3>Marine Emission Forecast Tool</h3></div>

        <div className='button-section'>
          <button onClick={display_spdpwr}>Start Setup</button>

        </div>

        <div className='button-section'>
          <button onClick={handleDevbutton} disabled={loading}>
            {loading ? (
              <ClipLoader color="#09f" loading={loading} size={12} />
            ) : (
              "Dev Button"
            )}
          </button>
        </div>
        <div className='button-section'>
          <button onClick={handleDevButton2} disabled={loading}>
            {loading ? (
              <ClipLoader color="#09f" loading={loading} size={20} />
            ) : (
              "Dev Button2"
            )}
          </button>
        </div>
        <div className='button-section'>
          <button onClick={handleSubmissiton} disabled={loading}>
            {loading ? (
              <ClipLoader color="#09f" loading={loading} size={20} />
            ) : (
              "Submit"
            )}
          </button>
        </div>



        <div className='infor-record'>
          <table>
            <caption>Pre Simulation Check List</caption>
            <thead><tr><th>Item</th><th>Value</th></tr></thead>
            <tbody>
              <tr><td>Speed Power Curve </td><td>{finalResquest.spd_power.length > 0 ? "Check" : "Absent"}</td></tr>
              {renderUseReceptDetail()}
              <tr><td colSpan={2}>-------Vessel Information-------</td></tr>
              <tr><td>Length</td><td>{finalResquest.design_particulars.length > 0 ? `${finalResquest.design_particulars.length} m` : "No Input"}</td></tr>
              <tr><td>Breadth</td><td>{finalResquest.design_particulars.breadth > 0 ? `${finalResquest.design_particulars.breadth} m` : "No Input"}</td></tr>
              <tr><td>Draught</td><td>{finalResquest.design_particulars.draught > 0 ? `${finalResquest.design_particulars.draught} m` : "No Input"}</td></tr>
              <tr><td>Block Coeffient</td><td>{finalResquest.design_particulars.block_coefficient > 0 ? finalResquest.design_particulars.block_coefficient : "No Input"}</td></tr>

            </tbody>
          </table>
        </div>

      </div>
      <SetFinalAnalysisRequest.Provider value={{ setFinalResquest, finalResquest }}>
        <SetRenderedTags.Provider value={renderedTags}>
          <ResultContext.Provider value={returnedRes}>
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
              {renderSeasons()}

            </Modal>
            <Tags></Tags>
          </ResultContext.Provider>
        </SetRenderedTags.Provider>
      </SetFinalAnalysisRequest.Provider>


    </div>
  )
}

export default App
