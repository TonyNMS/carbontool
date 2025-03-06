import React, { useContext } from "react";
import { ResultContext } from "../App";
const Summary =()=>{
    const res = useContext(ResultContext);
    
    return(
        <div className="summary-section">
            <h3>This is the summary</h3>
            <p>
                {res.historical_route_data}
            </p>
        </div>
    )
}

export default Summary;