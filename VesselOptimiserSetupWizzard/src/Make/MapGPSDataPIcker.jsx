

import React, { useState } from "react";
import Modal from 'react-modal';
const MODEL_STYLE = {
    content: {
      maxWidth: "7500px",
      maxHeight: "75%",
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
const MapGPSDataPicker =(props)=>{
    const [isModelOpen , setModelIsOpen] = useState(true);
    const [latCoord, setLatCoord] = useState(0);
    const [lngCoord, setLngCoord] = useState(0);
    function closeModal () {
        setModelIsOpen(false);
    }
    const handleConfirmCoordinate =()=>{

    }
    return (
       <Modal
        isOpen = {modalisOpen}
        onRequestClose={closeModal}
        contentLabel = "Pick a coodinate on the map"
        ariaHideApp={false}
        style = {
            MODEL_STYLE
        }  
        >
        <div className="gps-coord-picker">
            <label></label>
        </div>
        <div className="coord-picker-display"> </div>
        <div className="confirm-coord-button">
            <button onClick={handleConfirmCoordinate}>Confirm Coordinates</button>
        </div>
       </Modal>
    )


}
export default MapGPSDataPicker;