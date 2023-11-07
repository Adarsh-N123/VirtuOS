import React from 'react'
import './Body.css'

function Body(props) {
  const folders = ["Music","Pictures","Videos","Documents","Downloads","Applications"]
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
      {folders.map((folder) => (
                <div key={folder.toString()} className='folder'>
                  <img src='https://images.squarespace-cdn.com/content/v1/500bd3ece4b0d820d6a34677/1356128939263-3N3I8PWSXT4EH3NROIKG/purple-folder-icon.png' onClick={()=>{openwindow(folder)}} style={{width:'70px',margin:'20px'}}></img>
                  <h3 style={{color:'white',fontSize:'13px',marginTop:'-24px'}} className='folder-name'>{folder}</h3>
                </div>
            ))}
    </div>
  )
}

export default Body