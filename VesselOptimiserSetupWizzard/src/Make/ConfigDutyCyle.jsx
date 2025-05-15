// ConfigDutyCycle.js

import React, { useState } from "react";
import { DndContext, closestCenter } from "@dnd-kit/core";
import {
  SortableContext,
  verticalListSortingStrategy,
  arrayMove,
} from "@dnd-kit/sortable";

import SortableItem from "../DragNDrop/SortableItem"
import DutyCycleSegmentA from "./DutyCycleSegment_A";

export default function ConfigDutyCycle() {
  const [items, setItems] = useState([]);

  const handleAddTransferSegment = () => {
    const newId = (items.length + 1).toString();
    setItems((prev) => [
      ...prev,
      {
        id: newId,
        segmentType: "Transfering",
        useDeparturePort: true,
        useArrivalPort: true,
        departureCoord: { lat: "", lng: "" },
        arrivalCoord: { lat: "", lng: "" },
        speed: "",
        time: "",
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
        useDeparturePort: false,
        useArrivalPort: false,
        departureCoord: { lat: "", lng: "" },
        arrivalCoord: { lat: "", lng: "" },
        speed: "",
        time: "",
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
    console.log("Final array of segments:", items);
    // Each item contains up-to-date data from DutyCycleSegmentA
  };

  return (
    <div style={{ margin: "2rem" }}>
      <h2>List of Power Segments</h2>
      <div
        className="dnd-list"
        style={{ maxWidth: 600, maxHeight: 500, margin: "auto", overflow: "auto" }}
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
              // Render each item
              items.map((item, index) => (
                <SortableItem key={item.id} id={item.id}>
                  <DutyCycleSegmentA
                    segmentData={item}
                    onChange={(newData) => handleSegmentChange(index, newData)}
                  />
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
