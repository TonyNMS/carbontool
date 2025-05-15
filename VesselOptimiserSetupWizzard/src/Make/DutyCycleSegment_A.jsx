// DutyCycleSegmentA.js

import React from "react";

const ALL_PORTS = [
  { portsName: "Select a port", coords: [0, 0] },
  { portsName: "CUX", coords: [53.8813, 8.7735] },
  { portsName: "NCL", coords: [55.0120, -1.4123] },
  { portsName: "ROB", coords: [54.6333, 11.3231] },
  { portsName: "GLW", coords: [55.9260, -4.5064] },
];


export default function DutyCycleSegmentA({ segmentData, onChange }) {
    console.log("DutyCycleSegmentA is rendering for segment ID:", segmentData.id);

    const {
        useDeparturePort,
        useArrivalPort,
        departureCoord,
        arrivalCoord,
        speed,
        time,
        segmentType,
    } = segmentData;

    
    const displayPortOptions = () =>
        ALL_PORTS.map((item, index) => (
        <option key={index} value={index}>
            {item.portsName}
        </option>
        ));

    
    function handleUseDeparturePortChange(checked) {
       
        onChange({ ...segmentData, useDeparturePort: checked });
    }

    function handleUseArrivalPortChange(checked) {
        onChange({ ...segmentData, useArrivalPort: checked });
    }

    
    function handleDeparturePortSelect(e) {
        const index = parseInt(e.target.value, 10);
        const coords = ALL_PORTS[index].coords; 
        onChange({
        ...segmentData,
        departureCoord: { lat: coords[0], lng: coords[1] },
        });
    }

    function handleArrivalPortSelect(e) {
        const index = parseInt(e.target.value, 10);
        const coords = ALL_PORTS[index].coords;
        onChange({
        ...segmentData,
        arrivalCoord: { lat: coords[0], lng: coords[1] },
        });
    }

  
    function handleDepartureLatChange(latValue) {
        onChange({
        ...segmentData,
        departureCoord: { ...departureCoord, lat: latValue },
        });
    }
    function handleDepartureLngChange(lngValue) {
        onChange({
        ...segmentData,
        departureCoord: { ...departureCoord, lng: lngValue },
        });
    }
    function handleArrivalLatChange(latValue) {
        onChange({
        ...segmentData,
        arrivalCoord: { ...arrivalCoord, lat: latValue },
        });
    }
    function handleArrivalLngChange(lngValue) {
        onChange({
        ...segmentData,
        arrivalCoord: { ...arrivalCoord, lng: lngValue },
        });
    }

    // Speed, time changes
    function handleSpeedInput(value) {
        onChange({ ...segmentData, speed: value });
    }
    function handleTimeInput(value) {
        onChange({ ...segmentData, time: value });
    }

    return (
        <div style={{ border: "1px solid #ccc", padding: "8px" }}>
        <h4>{segmentType} Segment</h4>

        {/* DEPARTURE */}
        <label>
            Use Departure Port?{" "}
            <input
            type="checkbox"
            checked={useDeparturePort}
            onChange={(e) => handleUseDeparturePortChange(e.target.checked)}
            />
        </label>
        {useDeparturePort ? (
            <div>
            <select onChange={handleDeparturePortSelect}>
                {displayPortOptions()}
            </select>
            <p>
                Dep coords: lat {departureCoord.lat}, lng {departureCoord.lng}
            </p>
            </div>
        ) : (
            <div>
            <input
                type="number"
                placeholder="Depart Lat"
                value={departureCoord.lat}
                onChange={(e) => handleDepartureLatChange(e.target.value)}
            />
            <input
                type="number"
                placeholder="Depart Lng"
                value={departureCoord.lng}
                onChange={(e) => handleDepartureLngChange(e.target.value)}
            />
            </div>
        )}

        {/* ARRIVAL */}
        <label>
            Use Arrival Port?{" "}
            <input
            type="checkbox"
            checked={useArrivalPort}
            onChange={(e) => handleUseArrivalPortChange(e.target.checked)}
            />
        </label>
        {useArrivalPort ? (
            <div>
            <select onChange={handleArrivalPortSelect}>
                {displayPortOptions()}
            </select>
            <p>
                Arr coords: lat {arrivalCoord.lat}, lng {arrivalCoord.lng}
            </p>
            </div>
        ) : (
            <div>
            <input
                type="number"
                placeholder="Arrival Lat"
                value={arrivalCoord.lat}
                onChange={(e) => handleArrivalLatChange(e.target.value)}
            />
            <input
                type="number"
                placeholder="Arrival Lng"
                value={arrivalCoord.lng}
                onChange={(e) => handleArrivalLngChange(e.target.value)}
            />
            </div>
        )}

        {/* SPEED / TIME */}
        <div>
            <input
            type="number"
            placeholder="Speed in knots"
            value={speed}
            onChange={(e) => handleSpeedInput(e.target.value)}
            />
        </div>
        <div>
            <input
            type="number"
            placeholder="Segment duration in minutes"
            value={time}
            onChange={(e) => handleTimeInput(e.target.value)}
            />
        </div>
        </div>
    );
}
