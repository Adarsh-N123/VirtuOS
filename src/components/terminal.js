import React, { useState } from 'react'
import "./terminal.css"

function Terminal(props) {
  const [commands,setcommands] = useState([]);
  // console.log(props.minimised);
  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      // If Enter key is pressed, submit the form
      if (e.target.value==="clear"){
        setcommands([]);
        e.target.value = "";
      }else{
      setcommands([...commands,{com:e.target.value,ans:"command successful"}]);
      e.target.value="";
      }
      
    }
  };
  return (
    <div className={(props.minimised)?"terminalmini":"terminal"} onClick={()=>{props.updatez()}} style={{zIndex:`${props.terminalz}`}}>
    {/* <div className='terminal'> */}
      <div className='bar'>
        <div className='icons'>
          <div style={{width:'15px',height:'15px',borderRadius:'50%',backgroundColor:'red',cursor:'pointer'}} onClick={()=>{props.setminimised(true);props.setterminalz(0);}} ></div>
          <div style={{width:'15px',height:'15px',borderRadius:'50%',backgroundColor:'yellow',cursor:'pointer'}}></div>
          <div style={{width:'15px',height:'15px',borderRadius:'50%',backgroundColor:'green',cursor:'pointer'}}></div>
        </div>
        </div>
        <div className='term-body' style={{overflowY:'scroll'}}>
          <div>
          {commands.map((command)=>(
            <div>
            <p style={{color:'white',marginLeft:'35px'}}>{">"+command.com}</p>
            <p style={{color:'white',marginLeft:'35px'}}>{":"+command.ans}</p>
            </div>
          ))}
          <div style={{display:'flex',alignItems:"center",justifyContent:'center',width:'100%'}}>
          <p style={{color:'white'}}>></p>
          <input  type='text' className='comminput' placeholder='Enter Command' autoComplete='off' onKeyPress={handleKeyPress} ></input>
          </div>

        </div>
      </div>

    {/* </div> */}
    </div>
  )
}

export default Terminal