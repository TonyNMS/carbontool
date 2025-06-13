import React from "react";
import "../Styling/MetricDisplay.css";

/**
 * Props:
 *  - label: string       // e.g. "Total Fuel Used"
 *  - value: number       // the raw value to display
 *  - unit?: string       // e.g. "ton", "kW", "%"
 *  - formatter?: fn      // optional function to format the raw number
 */
export default function MetricDisplay({
  label,
  value,
  unit = "",
}) {
  return (
    <div className="metric-display">
      <div className="metric-value">{value.toFixed(2)}{unit && ` ${unit}`}</div>
      <div className="metric-label">{label}</div>
    </div>
  );
}
