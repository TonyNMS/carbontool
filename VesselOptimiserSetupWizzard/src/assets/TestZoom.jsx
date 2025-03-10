import React, { useEffect, useRef, useContext } from "react";
import L from "leaflet";
import {ResultContext } from "../App";
import "leaflet/dist/leaflet.css";

const TEMO_COORDS = [
  [55.00722078637494, -1.39656597301898],
  [54.98870919566775, -0.8342033040132141],
  [54.99304246142249, -0.23956830032707904],
  [55.01470177282599, 0.44295733185763064],
  [55.0813536208248, 2.6776921711760022],
  [55.17089736938877, 4.902274323015869],
  [54.96887060469377, 6.915530643060103],
  [54.54752560112028, 8.321225032105556],
  [54.365620674797285, 8.648733069349673],
];

const TestZoom = () => {
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
    coordsList=TEMO_COORDS
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
    <div className="test-chart-container">
        <div id="map" style={{ height: "1200px", width: "100%" }}></div>
    </div>
  );

};

export default TestZoom;
