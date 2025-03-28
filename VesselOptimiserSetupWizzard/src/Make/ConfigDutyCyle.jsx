import React, {useState, useContext} from "react";
import {
    DndContext,          
    closestCenter,       
    KeyboardSensor,
    PointerSensor,
    useSensor,
    useSensors
  } from "@dnd-kit/core";

  import {
    arrayMove,          
    SortableContext,     
    sortableKeyboardCoordinates,
    verticalListSortingStrategy
  } from "@dnd-kit/sortable";
  

import { SetFinalAnalysisRequest } from "../App";

const ALL_SEGMENT_TYPE = ["Transfering", "Job"];
const ConfigDutyCycle =()=>{
    const FINAL_REQUEST = useContext(SetFinalAnalysisRequest);
    const completedeDcSegmentSequence = useState([]);
    const [items, setItems] = useState ([]);


    const handleAddSegment = () =>{
        console.log("Things here");
        const newId = (items.length + 1).toString();
        const newItem={id : newId, content: `Item${newId}`}
        setItems((prev)=>[...prev, newItem])
    };
    
    const handleDragEnd = (event)=>{
        console.log("I am being dragged");
    }
    return(
        <div>
            <h2>List of Power Segement</h2>
            <div className="dnd-list" style={{ maxWidth: 600, height: 500 ,margin: "auto", overflow:"auto"}}>
                
                <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
                    <SortableContext
                        items={items.map((item)=>item.id)}
                        strategy={verticalListSortingStrategy}
                    >
                        {items.length === 0 ? (
                            <p>No items yet.</p>
                        ) : (
                            <ul style={{ listStyle: "none", padding: 0 }}>
                            {items.map((item) => (
                                <li
                                key={item.id}
                                style={{
                                    padding: "8px",
                                    marginBottom: "4px",
                                    border: "1px solid #ccc",
                                    borderRadius: "4px",
                                    background: "#fff"
                                }}
                                >
                                {item.content}
                                </li>
                            ))}
                            </ul>
                        )}
                    </SortableContext>
                </DndContext>
            </div>
            <div className= "button-section">
                <button onClick={handleAddSegment}>Add a Transfering Segment</button>
                <button onCLick={handleAddSegment}>Add a Job Segement</button>
                <button>Done</button>
            </div>
        </div>
    )
    

}
export default ConfigDutyCycle