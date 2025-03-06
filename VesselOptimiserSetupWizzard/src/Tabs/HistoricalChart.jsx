import React, { useContext, useEffect } from "react";
import {ResultContext } from "../App";
import { MapContainer, TileLayer, Polyline, Tooltip, Marker, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import '../Styling/HistoricalChart.css'
const TEMP_COORDS = [
    [36.0, -75.0],
    [36.0, -74.99778],
    [36.0, -74.99556],
    [36.0, -74.99555],
    [36.0, -74.99549],
    [36.0002, -74.99548],
    [36.0, -74.99544],
    [36.0, -74.99532],
    [36.0, -74.99522],
    [36.0, -74.99521],
    [36.0, -74.99510],
    [36.0, -74.99503],
    [36.0, -74.99500],
    [36.0001, -74.99499],
    [36.0003, -74.99486],
    [36.0009, -74.99483],
    [36.0, -74.99423],
    [36.0, -74.99400],
];

function InvalidateMapSize() {
    const map = useMap();
    useEffect(() => {
   
      const timeout = setTimeout(() => {
        map.invalidateSize();
      }, 200);
      return () => clearTimeout(timeout);
    }, [map]);
    return null;
}

const HistoricalChart = () => {
  const Uploaded_Evidence = useContext(ResultContext);
  const coordsList = Uploaded_Evidence.historical_route_data;
  const center = coordsList.length > 0 ? coordsList[0] : [54.99185, -1.45007];

  return (
    <div className="historical-chart-container">
        {console.log(JSON.stringify(Uploaded_Evidence))}
      <MapContainer center={center} zoom={16} style={{ width: '100%', height: '100%' }} zoomControl={false}>
    
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Tiles courtesy of <a href="http://www.openstreetmap.bzh/" target="_blank">Breton OpenStreetMap Team</a>'
          url='https://tile.openstreetmap.bzh/br/{z}/{x}/{y}.png'
        />
        <InvalidateMapSize />

        <Polyline positions={coordsList} color="blue" dashArray="2.5, 5">
            <Tooltip>Shipping Lane</Tooltip>
        </Polyline>
    
      </MapContainer>
    </div>
  );
};

export default HistoricalChart;
