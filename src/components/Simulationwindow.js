import React from 'react'
import "./simulation.css"
import "./terminal.css"
function Simulationwindow(props) {
  const minimisewindow = () => {
    const updatedWindows = [...props.windows];
    const targetWindow = props.opt;
    const index = updatedWindows.indexOf(targetWindow);
    
    // Update the state to minimize the window
    if (index !== -1) {
      updatedWindows[index].state = false;
      props.setwindows(updatedWindows); // Update the state with the modified copy
    }
  };
  const updatez = () => {
    const updatedWindows = [...props.windows];
    const targetWindow = props.opt;
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
    <div className='window' onClick={()=>{updatez()}}>
    <div className='foldbar'>
    <h4 style={{paddingRight:'30%',fontSize:'15px',fontFamily:'sans-serif'}}>{props.opt.heading}</h4>
      <div className='icons'>
          <div style={{width:'15px',height:'15px',borderRadius:'50%',backgroundColor:'red',cursor:'pointer'}} onClick={()=>{minimisewindow()}} ></div>
          <div style={{width:'15px',height:'15px',borderRadius:'50%',backgroundColor:'yellow',cursor:'pointer'}}></div>
          <div style={{width:'15px',height:'15px',borderRadius:'50%',backgroundColor:'green',cursor:'pointer'}}></div>
        </div>
       
      
    </div>
    <div className='foldbody'>

    </div>
    </div>
  )
}

export default Simulationwindow