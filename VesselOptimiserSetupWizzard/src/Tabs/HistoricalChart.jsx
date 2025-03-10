import React, { useContext, useEffect } from "react";
import {ResultContext } from "../App";
import { MapContainer, TileLayer, Polyline, Tooltip, Marker, useMap } from 'react-leaflet';
import L from "leaflet"
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
function centerLeafletMapOnMarker(map, marker) {
  var latLngs = [ marker.getLatLng() ];
  var markerBounds = L.latLngBounds(latLngs);
  map.fitBounds(markerBounds);
}
function Fitbounds({positions}){
  const map = useMap()
  useEffect(
    ()=>{
      if (positions && positions>0){
        const latLngs = positions.map((lat,lng)=>L.latLng(lat, lng))
        const bounds = L.latLngBounds(lat)
        map.fitBounds(bounds, {padding:[20,20]})
      }
    }, [map, positions]
  )
  return null
}


const HistoricalChart = () => {
  const Uploaded_Evidence = useContext(ResultContext);
    let coordsList
    let center
    if(Uploaded_Evidence.generated_route_data ){
      coordsList = Uploaded_Evidence.generated_route_data[0];
      console.log(coordsList)
    }else{
      coordsList=[]
    }
    if (coordsList == null){
      center =[55.0078440586911, -1.393887435769202]
      coordsList=TEMP_COORDS
    }else {
      center = coordsList[0]
    }
    const mapRef = useRef(null);
  
    useEffect(() => {
      if (!mapRef.current) {
        mapRef.current = L.map("map").setView(center, 5);
  
       
        L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
          attribution: "&copy; OpenStreetMap contributors",
        }).addTo(mapRef.current);
  
        
        const polyline = L.polyline(coordsList, {
          color: "blue",
          weight: 4,
          opacity: 0.7,
          dashArray: "10, 5",
        }).addTo(mapRef.current);
  
        mapRef.current.fitBounds(polyline.getBounds());
      }
    }, []);
    return(
      <div className="historical-chart-container ">
          <div id="map" style={{ height: "1200px", width: "100%" }}></div>
      </div>
    );
};

export default HistoricalChart;
