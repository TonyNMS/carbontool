// ConfigDutyCycle.js

import React, { useState, useContext } from "react";
import { DndContext, closestCenter } from "@dnd-kit/core";
import {
  SortableContext,
  verticalListSortingStrategy,
  arrayMove,
} from "@dnd-kit/sortable";

import SortableItem from "../DragNDrop/SortableItem"
import DutyCycleSegmentA from "./DutyCycleSegment_A";
import DutyCycleSegementB from "./DutyCycleSegment_B";
import { SetFinalAnalysisRequest } from "../App";

export default function ConfigDutyCycle(props) {
  const [items, setItems] = useState([]);
  const finalRequestContext = useContext(SetFinalAnalysisRequest);

  const handleAddTransferSegment = () => {
    const newId = (items.length + 1).toString();
    setItems((prev) => [
      ...prev,
      {
        id: newId,
        segmentType: "Transfering",
        useDeparturePort: true,
        useArrivalPort: true,
        departureCoord: { lat: "", lon: "" },
        arrivalCoord: { lat: "", lon: "" },
        speed: "",
        time: "",
        fuel:""
      },
    ]);
  };


  const handleAddJobSegment = () => {
    const newId = (items.length + 1).toString();
    setItems((prev) => [
      ...prev,
      {
        id: newId,
        segmentType: "Job",
        segmentPower: "",
        segmentTimeSpam: "",
        fuel:""
      },
    ]);
  };

 
  const handleDragEnd = (event) => {
    const { active, over } = event;
    if (!over) return; // if dropped outside the list, do nothing
    if (active.id !== over.id) {
      setItems((currentItems) => {
        const oldIndex = currentItems.findIndex((i) => i.id === active.id);
        const newIndex = currentItems.findIndex((i) => i.id === over.id);
        return arrayMove(currentItems, oldIndex, newIndex);
      });
    }
  };

  // 4) Handle updates from each DutyCycleSegmentA child

  const handleSegmentChange = (index, newData) => {
    setItems((prev) => {
      const updated = [...prev];
      updated[index] = { id: updated[index].id, ...newData };
      return updated;
    });
  };

  // 5) Final button to see the data in final order
  const handleDone = () => {
    console.log("Final array of segments:", items); // show all times
    
    // extract items array and format it to what final reqies want
    let temp_res = [];
    temp_res = items.map((item) =>{
      let obj;
      if (item.segmentType === "Transfering"){
        obj ={
          "segment_type": "Transfer",
          "start_coord": {
            "lat": Number(item.departureCoord.lat),
            "lon": Number(item.departureCoord.lng)
          },
          "end_coord": {
            "lat": Number(item.arrivalCoord.lat),
            "lon": Number(item.arrivalCoord.lng)
          },
          "speed": Number(item.speed),
          "time": Number(item.time),
          "fuel": item.fuel
        }
      }else{
        obj ={
          "segment_type": "Job",
          "average_power": Number(item.segmentPower),
          "time": Number(item.segmentTimeSpam),
          "fuel": item.fuel
        }
      }
      return obj;
    })
    // updated the final rresult context 
    finalRequestContext.setFinalResquest((prev)=> ({...prev, 
      duty_cycle: false, 
      duty_cycle_data: [], 
      duty_cycle_config : true,
      duty_cycle_config_data:temp_res
    }))
    props.closeModal();

  };

  return (
    <div style={{ margin: "2rem" }}>
      <h2>List of Journey Segments</h2>
      <div
        className="dnd-list"
        style={{ maxWidth: 800, maxHeight: 700, margin: "auto", overflow: "auto" }}
      >
        <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
          {/* We must pass in the array of IDs, for the sorting library */}
          <SortableContext
            items={items.map((item) => item.id)}
            strategy={verticalListSortingStrategy}
          >
            {items.length === 0 ? (
              <p>No items yet.</p>
            ) : (
              // Render each item, base on if they are transfer or job, use different template
              items.map((item, index) => (
                <SortableItem key={item.id} id={item.id}>
                  {item.segmentType === "Transfering" ? <DutyCycleSegmentA
                    segmentData={item}
                    onChange={(newData) => handleSegmentChange(index, newData)}
                  /> : <DutyCycleSegementB
                    segmentData={item}
                    onChange={(newData) => handleSegmentChange(index, newData)}
                  />}
                </SortableItem>
              ))
            )}
          </SortableContext>
        </DndContext>
      </div>

      {/* Buttons to add segments */}
      <div className="button-section" style={{ marginTop: "1rem" }}>
        <button onClick={handleAddTransferSegment}>Add a Transfer Segment</button>
        <button onClick={handleAddJobSegment}>Add a Job Segment</button>
        <button onClick={handleDone}>Done</button>
      </div>
    </div>
  );
}
