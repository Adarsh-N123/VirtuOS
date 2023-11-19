import React from 'react'
import './Body.css'

function Body(props) {
  const folders = ["Music","Pictures","Videos","Documents","Downloads","Applications"]
  const cpualgos = ["FCFS","SJF","RR","Priority Preemptive","Priority Non Preemptive","IRRVQ"];
  const folds =  [["CPU Scheduling","https://cdn-icons-png.flaticon.com/512/8186/8186331.png"],["Dynamic Storage Allocation","https://prepinstadotcom.s3.ap-south-1.amazonaws.com/wp-content/uploads/2021/10/memory-card.webp"],["Producer-Consumer.exe","https://cdn-icons-png.flaticon.com/512/2081/2081930.png"],["Semaphores.exe","https://cdn-icons-png.flaticon.com/512/2200/2200311.png"],["Dining-Philosophers.exe","https://prepinsta.com/wp-content/uploads/2023/01/Dining-Philosophers-in-Operating-System-.webp"]]
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
    <div className='body' style={{overflow:'hidden'}}>
      <div>
      {folders.map((folder) => (
                <div key={folder.toString()} className='folder'>
                  <img src='https://images.squarespace-cdn.com/content/v1/500bd3ece4b0d820d6a34677/1356128939263-3N3I8PWSXT4EH3NROIKG/purple-folder-icon.png' onClick={()=>{openwindow(folder)}} style={{width:'70px',margin:'20px'}}></img>
                  <h3 style={{color:'white',fontSize:'13px',marginTop:'-24px'}} className='folder-name'>{folder}</h3>
                </div>
            ))}
          </div>
      <div>
      {folds.map((folder) => (
                <div key={folder.toString()} className='folder'>
                  <img src={folder[1]} onClick={()=>{openwindow(folder[0])}} style={(folder[0]==="Dynamic Storage Allocation")?{width:'68px',margin:'20px',marginTop:'25px'}:{width:'68px',margin:'20px'}}></img>
                  <h3 style={{color:'white',fontSize:'10px',marginTop:'-18px'}} className='folder-name'>{folder[0]}</h3>
                </div>
            ))}
          </div>
    </div>
  )
}

export default Body