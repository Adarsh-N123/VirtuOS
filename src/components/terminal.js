import React, { useEffect, useState } from 'react';
import './terminal.css';

function Terminal(props) {
  const [commands, setCommands] = useState([]);
  const [responses, setResponses] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [terminalart, setTerminalArt] = useState([]);
  const [terminalart2, setTerminalArt2] = useState([]);
  const paths = ['./home/Dynamic-Storage-Allocation/First-Fit.exe','./home/Dynamic-Storage-Allocation/Next-Fit.exe','./home/Dynamic-Storage-Allocation/Best-Fit.exe','./home/Dynamic-Storage-Allocation/Worst-Fit.exe','./home/CPU-Scheduling/FCFS.exe','./home/CPU-Scheduling/SJF.exe','./home/CPU-Scheduling/RR.exe','./home/CPU-Scheduling/Priority-Preemptive.exe','./home/CPU-Scheduling/IRRVQ.exe','./home/Producer-Consumer.exe','./home/Semaphores.exe','./home/Dining-Philosophers.exe','./home/Page-Replacement/FIFO.exe','./home/Page-Replacement/LRU.exe','./home/Page-Replacement/MRU.exe','./home/Page-Replacement/Optimal.exe'];
  const windnames = ['First Fit','Next Fit','Best Fit','Worst Fit','FCFS','SJF','RR','Priority Preemptive','IRRVQ','Producer-Consumer.exe','Semaphores.exe','Dining-Philosophers.exe','FIFO','LRU','MRU','Optimal'];
  const [isrunningsim,setisrunningsim] = useState("");
// 
useEffect(()=>{props.setissim(isrunningsim)},[isrunningsim]);
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
const closewindow = (folder) => {
    const updatedWindows = [...props.windows]; // Create a copy of the windows array
    for (let i = 0; i < updatedWindows.length; i++) {
      if (updatedWindows[i].heading === folder) {
        updatedWindows[i].state = false; // Update the copy
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
  function extractNumber(inputValue) {
    // Use a regular expression to match the number at the end of the string
    const match = inputValue.match(/(\d+)$/);
  
    // Check if a match is found
    if (match) {
      // Extracted number is in match[1]
      return parseInt(match[1], 10);
    } else {
      // No number found at the end of the string
      return null;
    }
  }

// 
  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      if (inputValue.includes('create-process')){
          if (isrunningsim!=""){
            let lastCharacter = inputValue.charAt(inputValue.length - 1);

            // Convert the last character to an integer
            let lastCharacterAsInt = extractNumber(inputValue);
            props.setinstpassed(lastCharacterAsInt);
            setCommands([...commands, inputValue]);
            setInputValue('');
          }else{
            setCommands([...commands, inputValue]);
            setInputValue('');
            setResponses([...responses, 'Any simulator is Not running to create simulation process...']);
          }
      }
      else if (inputValue.includes('.exe')){
        if (isrunningsim==""){
          if (paths.includes(inputValue)){
                    var idte = paths.indexOf(inputValue);
                    openwindow(windnames[idte]);
                    setCommands([...commands, inputValue]);
                    setResponses([...responses, 'Simulator Started']);
                    setisrunningsim(windnames[idte]);
                    setInputValue('');
            
          }else{
            setCommands([...commands, inputValue]);
            setInputValue('');
            setResponses([...responses, 'Error File Not Found']);
          }

        }else{
          setCommands([...commands, inputValue]);
          setInputValue('');
          setResponses([...responses, 'Error A Simulation is Already Running']);

        }

      }else{
        if (inputValue==='exit'){
          if (isrunningsim===""){
            setCommands([...commands, inputValue]);
            setInputValue('');
            setResponses([...responses, 'Error No Simulation is Running']);
          }else{
            closewindow(isrunningsim);
            setCommands([...commands, inputValue]);
            setInputValue('');
            setResponses([...responses, 'Simulation Ended']);
            setisrunningsim("");
          }

        }else{
        if (inputValue === 'clear') {
          setCommands([]);
          setResponses([]);
          setInputValue('');
        } else {
          const queryParams = new URLSearchParams({
            param: inputValue,
          });
          execute(queryParams);
          setCommands([...commands, inputValue]);
          setInputValue('');
        }
      }
      }
    //   if (inputValue === './home/Dynamic-Storage-Allocation/First-Fit.exe') {
    //     openwindow('First Fit');
    //     setCommands([...commands, inputValue]);
    //     setisrunningsim("First Fit");
    //     setInputValue('');
    //   }else if (inputValue === 'exit' && isrunningsim==="First Fit"){
    //     closewindow('First Fit');
    //     setisrunningsim("");
    //     setCommands([...commands, inputValue]);
    //     setInputValue('');
    //   }
    //   else{
      
    // }
    }
  };
  const scrollableContainer = document.getElementById('bd');

  // Function to scroll to the bottom of the container
  function scrollToBottom() {
    scrollableContainer.scrollTop = scrollableContainer.scrollHeight*1.1;
  }

  useEffect(() => {
    const queryParams1 = new URLSearchParams({ param: 'start' });
    fetch(`http://127.0.0.1:5000/execute?${queryParams1.toString()}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((data) => {
        setTerminalArt(data);
      })
      .catch((error) => {
        console.error('There was a problem with the fetch operation:', error);
        setTerminalArt([]);
      });
    const queryParams2 = new URLSearchParams({ param: 'hl' });
    fetch(`http://127.0.0.1:5000/execute?${queryParams2.toString()}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((data) => {
        setTerminalArt2(data);
      })
      .catch((error) => {
        console.error('There was a problem with the fetch operation:', error);
        setTerminalArt2([]);
      });
  }, []);

  function execute(queryParams) {
    fetch(`http://127.0.0.1:5000/execute?${queryParams.toString()}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((data) => {
        setResponses([...responses, data]);
        scrollToBottom();
      })
      .catch((error) => {
        console.error('There was a problem with the fetch operation:', error);
        setResponses([...responses, 'Error']);
        scrollToBottom();
      });
  }
  
  
  return (
    <div className={props.minimised ? 'terminalmini' : 'terminal'}  style={{ zIndex: `${props.terminalz}` }}>
      <div className='bar' onMouseEnter={()=>{props.setisdraggable(false)}} onMouseLeave={()=>{props.setisdraggable(true)}}>
        <div className='icons'>
          <div style={{ width: '15px', height: '15px', borderRadius: '50%', backgroundColor: 'red', cursor: 'pointer' }} onClick={() => { props.setminimised(true); props.setterminalz(0); }}></div>
          <div style={{ width: '15px', height: '15px', borderRadius: '50%', backgroundColor: 'yellow', cursor: 'pointer' }}></div>
          <div style={{ width: '15px', height: '15px', borderRadius: '50%', backgroundColor: 'green', cursor: 'pointer' }}></div>
        </div>
      </div>
      <div className='term-body' id='bd' style={{ overflowY: 'scroll',overflowX:'hidden' }}>
          <div className='ascii-art' style={{textAlign:'center'}}>
            <pre style={{fontSize:'10px'}}>
              {terminalart}
            </pre>
          
          </div>
          <div className='ascii-art' style={{marginTop:'-40px',color:'yellow',marginLeft:'33px'}}>
            <pre style={{fontSize:'3px',lineHeight:'1'}}>
              {terminalart2}
            </pre>
          
          </div>
        <div>
          {commands.map((command, index) => (
            <div key={index}>
              <p style={{ color: 'white', marginLeft: '35px' }}>{'>' + command}</p>
              <div>
                {Array.isArray(responses[index]) ? responses[index].map((ans, ansIndex) => (
                  <p style={{ color: 'white', marginLeft: '65px' }} key={ansIndex}>{ans}</p>
                )) : (
                  <p style={{ color: 'white', marginLeft: '65px' }}>{responses[index]}</p>
                )}
              </div>
            </div>
          ))}

          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100%' }}>
            <p style={{ color: 'white' }}>></p>
            <input
              type='text'
              className='comminput'
              placeholder='Enter Command'
              autoComplete='off'
              onKeyPress={handleKeyPress}
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
            ></input>
          </div>
        </div>
      </div>
    </div>
  );
                
}

export default Terminal;
