import React from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

export default function SortableItem({ id, children }) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
    /* We won't set cursor: grab on the entire container, 
       because we only want a small "handle" to be draggable. */
  };

  return (
    <div ref={setNodeRef} style={style}>
      {/* 
        Render the "drag handle" somewhere. This is the only place
        we attach the "listeners" and "attributes," making it
        the sole draggable region.
      */}
      <div
        style={{
          background: "#ccc",
          padding: "4px 8px",
          cursor: "grab",
          marginBottom: "8px",
        }}
        {...attributes}
        {...listeners}
      >
        Drag Handle
      </div>

      {/* The rest of the item’s content is freely clickable */}
      {children}
    </div>
  );
}
