import React, { useState } from "react";
import "../Styling/GeneratedDutyCycle.css";

const JOURNEY = [
  "Select a Journey",
  "Start Up",
  "Stationary",
  "Idle",
  "Shutdown",
  "Push On",
  "Harbour",
  "Sailing Slow Speed",
  "Sailing Survey",
  "Sailing Transit",
  "Sailing Transport",
  "DP Good Condition",
  "DP Bad Condition",
  "DP Medium",
];

const GenerateDutyCycle = () => {

  const [journeysCollection, setJourneysCollection] = useState([]);

  const [activeIndex, setActiveIndex] = useState(0);


  const handleAddJourney = () => {

    const newJourney = {
      type: "",
      avg_pwr: "",
      avg_pwr2: "",
      var: "",
      time_span: "",
    };

    const updated = [...journeysCollection, newJourney];
    setJourneysCollection(updated);
    setActiveIndex(updated.length - 1);
  };


  const handleJourneyChange = (key, value) => {
    const updated = [...journeysCollection];
    updated[activeIndex] = { ...updated[activeIndex], [key]: value };
    setJourneysCollection(updated);
  };


  const handleNext = () => {
    if (journeysCollection.length > 1) {
      setActiveIndex((prev) => (prev + 1) % journeysCollection.length);
    }
  };


  const handlePrev = () => {
    if (journeysCollection.length > 1) {
      setActiveIndex((prev) =>
        prev === 0 ? journeysCollection.length - 1 : prev - 1
      );
    }
  };


  const addCurrentJourneyData = () => {
    const currentJourney = journeysCollection[activeIndex];
    const [journeysCollection, setJourneysCollection] = useState([]);

  const [activeIndex, setActiveIndex] = useState(0);


  const handleAddJourney = () => {

    const newJourney = {
      type: "",
      avg_pwr: "",
      avg_pwr2: "",
      var: "",
      time_span: "",
    };

    const updated = [...journeysCollection, newJourney];
    setJourneysCollection(updated);
    setActiveIndex(updated.length - 1);
  };


  const handleJourneyChange = (key, value) => {
    const updated = [...journeysCollection];
    updated[activeIndex] = { ...updated[activeIndex], [key]: value };
    setJourneysCollection(updated);
  };


  const handleNext = () => {
    if (journeysCollection.length > 1) {
      setActiveIndex((prev) => (prev + 1) % journeysCollection.length);
    }
  };


  const handlePrev = () => {
    if (journeysCollection.length > 1) {
      setActiveIndex((prev) =>
        prev === 0 ? journeysCollection.length - 1 : prev - 1
      );
    }
  };


  const addCurrentJourneyData = () => {
    const currentJourney = journeysCollection[activeIndex];
    
   
    if (
      !currentJourney.type ||
      currentJourney.type === "Select a Journey" ||
      currentJourney.avg_pwr === "" ||
      currentJourney.time_span === "" ||
      currentJourney.var === ""
    ) {
      alert("Please fill out all required fields.");
      return;
    }

    console.log("Current Journey:", currentJourney);
  }

 
  const handleFinish = () => {
    
    const finalData = journeysCollection.map((journeyObj) => ({
      type: journeyObj.type,
      avg_pwr: journeyObj.avg_pwr === "" ? 0 : parseFloat(journeyObj.avg_pwr),
      avg_pwr2: journeyObj.avg_pwr2 === "" ? 0 : parseFloat(journeyObj.avg_pwr2),
      var: journeyObj.var === "" ? 0 : parseFloat(journeyObj.var),
      time_span: journeyObj.time_span === "" ? 0 : parseFloat(journeyObj.time_span),
    }));

    console.log("All journeys (parsed):", finalData);
  };


  const renderActiveJourneyCard = () => {
    if (journeysCollection.length === 0) {
      return <div>Please add a Journey</div>;
    }
    const j = journeysCollection[activeIndex];

    return (
      <div className="input-card-section">
        <table className="select-table">
          <tbody>
            <tr>
              <td>Select a Journey:</td>
              <td>
                <select
                  value={j.type}
                  onChange={(e) => handleJourneyChange("type", e.target.value)}
                >
                  {JOURNEY.map((opt, idx) => (
                    <option value={opt} key={idx}>
                      {opt}
                    </option>
                  ))}
                </select>
              </td>
            </tr>
            <tr>
              <td>Average Power Demand 1 (kW):</td>
              <td>
                <input
                  type="number"

                  value={j.avg_pwr}
                  onChange={(e) => {

                    handleJourneyChange("avg_pwr", e.target.value);
                  }}
                  placeholder="e.g. 1000"
                />
              </td>                    // e.target.value is always a string
            </tr>
            <tr>
              <td>Average Power Demand 2 (kW):</td>
              <td>
                <input
                  type="number"
                  value={j.avg_pwr2}
                  onChange={(e) => handleJourneyChange("avg_pwr2", e.target.value)}
                  placeholder="e.g. 500"
                />
              </td>
            </tr>
            <tr>
              <td>Journey Time Span (minutes):</td>
              <td>
                <input
                  type="number"
                  value={j.time_span}
                  onChange={(e) => handleJourneyChange("time_span", e.target.value)}
                  placeholder="e.g. 30"
                />
              </td>
            </tr>
            <tr>
              <td>Power Demand Variance (%):</td>
              <td>
                <input
                  type="number"
                  value={j.var}
                  onChange={(e) => handleJourneyChange("var", e.target.value)}
                  placeholder="e.g. 10"
                />
              </td>
            </tr>
          </tbody>
        </table>
        <button onClick={addCurrentJourneyData}>Add this Journey</button>
      </div>
    );
  };

  return (
    <div className="duty-gen-section">
      <button onClick={handleAddJourney}>Add Another Journey</button>
      <div className="carousel-container">
        <div className="carousel-card">{renderActiveJourneyCard()}</div>
        {journeysCollection.length > 1 && (
          <div className="carousel-controls">
            <button onClick={handlePrev}>Previous</button>
            <button onClick={handleNext}>Next</button>
          </div>
        )}
      </div>
      <div className="control-section">
            <button onClick={handlePrev}>&#x27F8;Previous</button>
            <button onClick={handleFinish}>Finish Duty Cycle Generation</button>
            <button onClick={handleNext}>Next&#x27F9;</button>
      </div>
      
      
      
    </div>
  );
   
    if (
      !currentJourney.type ||
      currentJourney.type === "Select a Journey" ||
      currentJourney.avg_pwr === "" ||
      currentJourney.time_span === "" ||
      currentJourney.var === ""
    ) {
      alert("Please fill out all required fields.");
      return;
    }

    console.log("Current Journey:", currentJourney);
  }

 
  const handleFinish = () => {
    
    const finalData = journeysCollection.map((journeyObj) => ({
      type: journeyObj.type,
      avg_pwr: journeyObj.avg_pwr === "" ? 0 : parseFloat(journeyObj.avg_pwr),
      avg_pwr2: journeyObj.avg_pwr2 === "" ? 0 : parseFloat(journeyObj.avg_pwr2),
      var: journeyObj.var === "" ? 0 : parseFloat(journeyObj.var),
      time_span: journeyObj.time_span === "" ? 0 : parseFloat(journeyObj.time_span),
    }));

    console.log("All journeys (parsed):", finalData);
  };


  const renderActiveJourneyCard = () => {
    if (journeysCollection.length === 0) {
      return <div>Please add a Journey</div>;
    }
    const j = journeysCollection[activeIndex];

    return (
      <div className="input-card-section">
        <table className="select-table">
          <tbody>
            <tr>
              <td>Select a Journey:</td>
              <td>
                <select
                  value={j.type}
                  onChange={(e) => handleJourneyChange("type", e.target.value)}
                >
                  {JOURNEY.map((opt, idx) => (
                    <option value={opt} key={idx}>
                      {opt}
                    </option>
                  ))}
                </select>
              </td>
            </tr>
            <tr>
              <td>Average Power Demand 1 (kW):</td>
              <td>
                <input
                  type="number"

                  value={j.avg_pwr}
                  onChange={(e) => {

                    handleJourneyChange("avg_pwr", e.target.value);
                  }}
                  placeholder="e.g. 1000"
                />
              </td>                    // e.target.value is always a string
            </tr>
            <tr>
              <td>Average Power Demand 2 (kW):</td>
              <td>
                <input
                  type="number"
                  value={j.avg_pwr2}
                  onChange={(e) => handleJourneyChange("avg_pwr2", e.target.value)}
                  placeholder="e.g. 500"
                />
              </td>
            </tr>
            <tr>
              <td>Journey Time Span (minutes):</td>
              <td>
                <input
                  type="number"
                  value={j.time_span}
                  onChange={(e) => handleJourneyChange("time_span", e.target.value)}
                  placeholder="e.g. 30"
                />
              </td>
            </tr>
            <tr>
              <td>Power Demand Variance (%):</td>
              <td>
                <input
                  type="number"
                  value={j.var}
                  onChange={(e) => handleJourneyChange("var", e.target.value)}
                  placeholder="e.g. 10"
                />
              </td>
            </tr>
          </tbody>
        </table>
        <button onClick={addCurrentJourneyData}>Add this Journey</button>
      </div>
    );
  };

  return (
    <div className="duty-gen-section">
      <button onClick={handleAddJourney}>Add Another Journey</button>
      <div className="carousel-container">
        <div className="carousel-card">{renderActiveJourneyCard()}</div>
        {journeysCollection.length > 1 && (
          <div className="carousel-controls">
            <button onClick={handlePrev}>Previous</button>
            <button onClick={handleNext}>Next</button>
          </div>
        )}
      </div>
      <div className="control-section">
            <button onClick={handlePrev}>&#x27F8;Previous</button>
            <button onClick={handleFinish}>Finish Duty Cycle Generation</button>
            <button onClick={handleNext}>Next&#x27F9;</button>
      </div>
      
      
      
    </div>
  );
};

export default GenerateDutyCycle;
