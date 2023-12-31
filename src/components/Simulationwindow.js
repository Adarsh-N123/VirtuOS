import React from 'react'
import "./simulation.css"
import "./terminal.css"
import SJF from './simulations/SJF';
import FCFS from './simulations/FCFS';
import RoundRobin from './simulations/RoundRobin';
import Producer from './simulations/Producer';
import './Body.css'
import Priority from './simulations/priority';
import Firstfit from './simulations/Firstfit';
import Nextfit from './simulations/Nextfit';
import Bestfit from './simulations/Bestfit';
import Worstfit from './simulations/Worstfit';
import Semaphores from './simulations/Semaphores';
import Dining from './simulations/Dining';
import IRRVQ from './simulations/IRRVQ';
import FIFO from './simulations/FIFO';
import LRU from './simulations/LRU';
import MRU from './simulations/MRU';
import OPTIMAL from './simulations/OPTIMAL';
// ["IRRVQ","https://www.svgrepo.com/show/375384/cloud-scheduler.svg"]
// ["IRRVQ","https://www.svgrepo.com/show/375384/cloud-scheduler.svg"]
function Simulationwindow(props) {
  const cpualgos = [["FCFS","https://www.dlf.pt/dfpng/middlepng/437-4370737_cloud-queue-logo-message-queue-icon-hd-png.png"],["SJF","https://cdn-icons-png.flaticon.com/512/2369/2369541.png"],["RR","https://cdn-icons-png.flaticon.com/512/1583/1583264.png"],["Priority Preemptive","https://cdn-icons-png.flaticon.com/512/477/477439.png"]];
  const dynamic_storage = [["First Fit","https://cdn-icons-png.flaticon.com/512/1021/1021080.png"],["Next Fit","https://prepinsta.com/wp-content/uploads/2023/07/Next-Fit-Algorithm-in-Operating-System-OS-Program.webp"],["Best Fit","https://cdn0.iconfinder.com/data/icons/stem-science-technology-engineering-math-educati-1/64/provider-solution-puzzle-missing-piece-512.png"],["Worst Fit","https://cdn1.iconfinder.com/data/icons/business-934/32/business-27-512.png"]];
  const page_replacement = [["FIFO","https://cdn-icons-png.flaticon.com/512/3575/3575759.png"],["LRU","https://prepinstadotcom.s3.ap-south-1.amazonaws.com/wp-content/uploads/2022/03/files.png"],["MRU","https://cdn-icons-png.flaticon.com/512/4408/4408036.png"]];
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
      const maxZ = Math.max(maxZIndex,props.terminalz);
      
      // Set the z-index of the clicked window to be one higher than the maximum
      updatedWindows[index].zi = maxZ + 1;
      props.setwindows(updatedWindows);
    }
  };
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
  const updatez1 = () => {
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
    <div className='window' onClick={()=>{updatez1()}} >
    <div className='foldbar' onMouseEnter={()=>{props.setIsDragging(false);}} onMouseLeave={()=>{props.setIsDragging(true);}}>
    <h4 style={{paddingRight:'30%',fontSize:'15px',fontFamily:'sans-serif'}}>{props.opt.heading}</h4>
      <div className='icons'>
          <div style={{width:'15px',height:'15px',borderRadius:'50%',backgroundColor:'red',cursor:'pointer'}} onClick={()=>{minimisewindow()}} ></div>
          <div style={{width:'15px',height:'15px',borderRadius:'50%',backgroundColor:'yellow',cursor:'pointer'}}></div>
          <div style={{width:'15px',height:'15px',borderRadius:'50%',backgroundColor:'green',cursor:'pointer'}} onMouseEnter={()=>{props.setIsDragging(false);}} onMouseLeave={()=>{props.setIsDragging(true);}}></div>
        </div>
       
      
    </div>
    <div style={{overflowY:'scroll',height:'92.5%'}}>
    <div className='foldbody' >
      {props.opt.heading === "FCFS" && <FCFS issim={props.issim} setissim={props.setissim} instpassed={props.instpassed} setinstpassed={props.setinstpassed} />}
      {props.opt.heading === "SJF" &&<SJF issim={props.issim} setissim={props.setissim} instpassed={props.instpassed} setinstpassed={props.setinstpassed}/>}
      {props.opt.heading === "RR" &&<RoundRobin issim={props.issim} setissim={props.setissim} instpassed={props.instpassed} setinstpassed={props.setinstpassed}/>}
      {props.opt.heading === "Priority Preemptive" &&<Priority issim={props.issim} setissim={props.setissim} instpassed={props.instpassed} setinstpassed={props.setinstpassed}/>}
      {props.opt.heading === "IRRVQ" &&<IRRVQ issim={props.issim} setissim={props.setissim} instpassed={props.instpassed} setinstpassed={props.setinstpassed}/>}
      {props.opt.heading === "FIFO" &&<FIFO issim={props.issim} setissim={props.setissim} instpassed={props.instpassed} setinstpassed={props.setinstpassed}/>}
      {props.opt.heading === "LRU" &&<LRU issim={props.issim} setissim={props.setissim} instpassed={props.instpassed} setinstpassed={props.setinstpassed}/>}
      {props.opt.heading === "MRU" &&<MRU issim={props.issim} setissim={props.setissim} instpassed={props.instpassed} setinstpassed={props.setinstpassed}/>}
      {props.opt.heading === "Optimal" &&<OPTIMAL issim={props.issim} setissim={props.setissim} instpassed={props.instpassed} setinstpassed={props.setinstpassed}/>}
      {props.opt.heading === "First Fit" && <Firstfit issim={props.issim} setissim={props.setissim} instpassed={props.instpassed} setinstpassed={props.setinstpassed}/>}
      {props.opt.heading === "Next Fit" &&<Nextfit issim={props.issim} setissim={props.setissim} instpassed={props.instpassed} setinstpassed={props.setinstpassed}/>}
      {props.opt.heading === "Best Fit" &&<Bestfit issim={props.issim} setissim={props.setissim} instpassed={props.instpassed} setinstpassed={props.setinstpassed}/>}
      {props.opt.heading === "Worst Fit" &&<Worstfit issim={props.issim} setissim={props.setissim} instpassed={props.instpassed} setinstpassed={props.setinstpassed}/>}
      {props.opt.heading === "Producer-Consumer.exe" &&<Producer issim={props.issim} setissim={props.setissim} instpassed={props.instpassed} setinstpassed={props.setinstpassed}/>}
      {props.opt.heading === "Semaphores.exe" &&<Semaphores issim={props.issim} setissim={props.setissim} instpassed={props.instpassed} setinstpassed={props.setinstpassed}/>}
      {props.opt.heading === "Dining-Philosophers.exe" &&<Dining issim={props.issim} setissim={props.setissim} instpassed={props.instpassed} setinstpassed={props.setinstpassed}/>}
      {props.opt.heading === "CPU Scheduling" && <div style={{width:'90%',display:'flex',flexWrap:'wrap',alignItems:'center',justifyContent:'left'}}>
      {cpualgos.map((folder) => (
                <div key={folder.toString()} className='folder' style={{marginLeft:'30px'}}>
                  <img src={folder[1]} onClick={()=>{openwindow(folder[0])}} style={{width:'70px',height:'70px',margin:'20px',borderRadius:'50%'}}></img>
                  <center><h3 style={{color:'white',fontSize:'10px',marginTop:'-14px',width:'80px'}} className='folder-name'>{folder[0]+".exe"}</h3></center>
                </div>
            ))}
          </div>}
      {props.opt.heading === "Dynamic Storage Allocation" && <div style={{width:'90%',display:'flex',flexWrap:'wrap',alignItems:'center',justifyContent:'left'}}>
      {dynamic_storage.map((folder) => (
                <div key={folder.toString()} className='folder' style={{marginLeft:'30px'}}>
                  <img src={folder[1]} onClick={()=>{openwindow(folder[0])}} style={{width:'70px',height:'70px',margin:'20px',borderRadius:'10%'}}></img>
                  <center><h3 style={{color:'white',fontSize:'10px',marginTop:'-14px',width:'80px'}} className='folder-name'>{folder[0]+".exe"}</h3></center>
                </div>
            ))}
          </div>}
      {props.opt.heading === "Page-Replacement" && <div style={{width:'90%',display:'flex',flexWrap:'wrap',alignItems:'center',justifyContent:'left'}}>
      {page_replacement.map((folder) => (
                <div key={folder.toString()} className='folder' style={{marginLeft:'30px'}}>
                  <img src={folder[1]} onClick={()=>{openwindow(folder[0])}} style={{width:'70px',height:'70px',margin:'20px',borderRadius:'10%'}}></img>
                  <center><h3 style={{color:'white',fontSize:'10px',marginTop:'-14px',width:'80px'}} className='folder-name'>{folder[0]+".exe"}</h3></center>
                </div>
            ))}
          </div>}
        

    </div>
    </div>
    </div>
  )
}

export default Simulationwindow