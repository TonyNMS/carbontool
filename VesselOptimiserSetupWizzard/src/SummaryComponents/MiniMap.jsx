import React, {useContext, useRef, useEffect} from "react";
import { ResultContext } from "../App";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import "../Styling/HistoricalChart.css";
const DEFAULT_CENTER = [55.0078440586911, -1.393887435769202]; 

const MiniMap = () => {
  const Uploaded_Evidence = useContext(ResultContext);
  const mapRef = useRef(null);

 
  const coordsList =
    Uploaded_Evidence?.generated_route_data?.[0]?.length > 0
      ? Uploaded_Evidence.generated_route_data[0]
      : [DEFAULT_CENTER]; 

  const center = coordsList[0];

  useEffect(() => {
    if (!mapRef.current) {
      mapRef.current = L.map("map").setView(center, 5);

      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution: "&copy; OpenStreetMap contributors",
      }).addTo(mapRef.current);

      
      if (coordsList.length > 1) {
        const polyline = L.polyline(coordsList, {
          color: "blue",
          weight: 4,
          opacity: 0.7,
          dashArray: "10, 5",
        }).addTo(mapRef.current);

        mapRef.current.fitBounds(polyline.getBounds());
      }
    }
  }, [coordsList, center]);

  return (
    <div className="historical-chart-container">
      <div id="map" style={{ height: "1200px", width: "100%" }}></div>
    </div>
  );
};

export default MiniMap;