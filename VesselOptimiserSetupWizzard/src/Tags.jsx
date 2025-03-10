import React, {useContext,useState } from "react";
import SpdPwrChart from "./Tabs/SpdPwrChart";
import HistroicalChart from "./Tabs/HistoricalChart"
import DutyCycleChart from "./Tabs/DutyCycleChart"
import Summary from "./Tabs/Summary";
import Welcome from "./Tabs/Welcome";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import 'react-tabs/style/react-tabs.css';
import "./Styling/Tags.css";

import {SetRenderedTags } from "./App";
import TestZoom from "./assets/TestZoom";

const ALL_TABS = {
    "Welcome":"Welcome Page",
    "SpdPwr":"Speed Power Chart",
    "History":"Historical Route Chart",
    "DutyCycle":"Duty Cycle Chart",
    "Summary" : "General Summary"
}
const ALL_PANELS ={
    "Welcome":<Welcome></Welcome>,
    "SpdPwr":<SpdPwrChart></SpdPwrChart>,
    "History":<HistroicalChart></HistroicalChart>,
    "DutyCycle":<DutyCycleChart></DutyCycleChart>,
    "Summary" : <Summary></Summary>
}
function Tags(){
    const renderedList = useContext(SetRenderedTags);
    const [tabIndex, setTabIndex] = useState(0);
    const renderTabs =()=>{
        return(
          <>
            {renderedList.map((item, index)=><Tab key = {`tags_${index}`}> 
              {ALL_TABS[item]}
            </Tab>)}
          </>
        )
    }
    const renderTabPanels=()=>{
        return(
          <>
            {renderedList.map((item, index)=>
              <TabPanel key = {`tagPanel_${index}`}>
                {tabIndex === index ? ALL_PANELS[item]: null}
              </TabPanel>
            )}
          </>
        )
    }
    return(
        <div className="tags-section">
            <Tabs selectedIndex={tabIndex} onSelect={index => setTabIndex(index)}>
                <TabList>
                {renderTabs()}
                </TabList>
                {renderTabPanels()}
            </Tabs>
        </div>
    )

}
export default Tags
