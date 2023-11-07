import React, { useState } from 'react'
import "./nav.css"
import Help from './help'
import Simulationwindow from './Simulationwindow'
import { Rnd } from 'react-rnd'
function Nav(props) {
    const options = ["Window","Help","Simulations","Preferences"]
    const optionssim = ["FCFS","SJF","SRTF","Priority","Round Robin","Bankers Algorithm","Page Replacement Algorithms","Disk Scheduling Algorithms","Memory Allocation Algorithms","File Allocation Algorithms","Deadlock"]
    const [help,sethelp] = useState(false);
    const openwindow = (folder) => {
      const updatedWindows = [...props.windows]; // Create a copy of the windows array
      for (let i = 0; i < updatedWindows.length; i++) {
        if (updatedWindows[i].heading === folder) {
          updatedWindows[i].state = true; // Update the copy
          break;
        }
      }
      props.setwindows(updatedWindows); // Update the state with the modified copy
      updatez(folder);
    };
    const updatez = (folder) => {
      const updatedWindows = [...props.windows];
  
      var targetWindow = {};
      for (let i=0;i<updatedWindows.length;i++){
        if (updatedWindows[i].heading === folder) {
          targetWindow = updatedWindows[i];
        }
      }  
  
      const index = updatedWindows.indexOf(targetWindow);
  
      if (index !== -1) {
        // Find the maximum z-index among all windows
        const maxZIndex = Math.max(...updatedWindows.map((window) => window.zi));
        
        // Set the z-index of the clicked window to be one higher than the maximum
        updatedWindows[index].zi = maxZIndex + 1;
        props.setwindows(updatedWindows);
      }
    };
    
  return (
    <div>
    <div className="nav">
      <img src='https://p3d.in/static/uploads/94995/image-db241279986.png' style={{width:'40px',marginLeft:'10px',borderRadius:'10%'}}></img>
      {options.map((option) => (
                <div key={option.toString()} id={option}>
                  <h3 className='opt' id={option} onClick={()=>{openwindow(option)}}>{option}</h3>
                  <div className='dropdown' style={{overflowY:'scroll',zIndex:'20'}}>
    {optionssim.map((option) => (
                <div key={option.toString()} id={option}  className='optsim' style={{}}>
                  <h3 className='opt' style={{paddingBottom:'8px',paddingTop:'10px'}} >{option}</h3>
                  {/* <br></br> */}
                </div>
            ))}
    </div>
                </div>
            ))}
        

    </div>
    
    
    </div>
  )
}

export default Nav