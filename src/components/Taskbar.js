import React, { useState } from 'react'
import "./Taskbar.css"
import Terminal from './terminal';

import Draggable from 'react-draggable';
function Taskbar(props) {
    const [minimised,setminimised] = useState(true);
    const applications = ["https://upload.wikimedia.org/wikipedia/commons/thumb/7/74/Spotify_App_Logo.svg/1200px-Spotify_App_Logo.svg.png","https://cdn.domestika.org/c_fill,dpr_auto,f_auto,q_auto/v1578470973/content-items/003/585/608/A9_512x512_b_mountain2-original.png?1578470973","https://static.vecteezy.com/system/resources/previews/020/190/686/non_2x/netflix-logo-netflix-icon-free-free-vector.jpg","https://www.shareicon.net/data/512x512/2015/08/28/92444_whatsapp_512x512.png","https://play-lh.googleusercontent.com/Y7drWZZo_F2GBE1RhjR1irOkE3yrtPorHS1U9YkLKAu1DnTjQ8gNbcRmrBtkd3tnHQ","https://static.vecteezy.com/system/resources/previews/013/948/547/non_2x/chrome-logo-on-transparent-white-background-free-vector.jpg","https://i.redd.it/w2cr0eggxd171.png","https://cdn.icon-icons.com/icons2/2667/PNG/512/iterm_terminal_icon_161274.png"];
    const openTerminal = (e) =>{
      // console.log(e.target.id);
      if (e.target.id==="https://cdn.icon-icons.com/icons2/2667/PNG/512/iterm_terminal_icon_161274.png"){
        if (minimised==true){
        setminimised(false);
        }else{
          setminimised(true);
        }
    }
    }
    const updatez = () => {
      const updatedWindows = [...props.windows];
  
      
        // Find the maximum z-index among all windows
        const maxZIndex = Math.max(...updatedWindows.map((window) => window.zi));
        var maxIdx = Math.max(maxZIndex,props.terminalz);
        
        // Set the z-index of the clicked window to be one higher than the maximum
        
        props.setterminalz(maxIdx+1);
        // console.log(props.terminalz);
    };

  return (
    <div className='taskbar'>
            {applications.map((application) => (
              <div key={application.toString()} id={application}>
                  <img src={application} id={application} alt='application' className='application' onClick={openTerminal} />
                  {application === "https://cdn.icon-icons.com/icons2/2667/PNG/512/iterm_terminal_icon_161274.png" ? <Terminal terminalz={props.terminalz} setterminalz={props.setterminalz} updatez={updatez} minimised = {minimised} setminimised={setminimised} /> : null}
                  <div className='dot' />
              </div>
          ))}

    </div>
  )
}

export default Taskbar