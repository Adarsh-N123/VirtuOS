import React, { useEffect, useState } from 'react'
import "./bestfit.css"

function Bestfit(props) {
  const initialProgress = 0;
    const initialSimulationStarted = false;
    const [widths,setwidths] = useState([10,5,7,9,20,11,15,8,10,5]);
    const [occupancies,setoccupancies] = useState([[],[],[],[],[],[],[],[],[],[]]);
    const totalmem = 1000;
    const [progresses,setprogresses] = useState([]);
  
    const [progress, setProgress] = useState(initialProgress);
    const [simulationStarted, setSimulationStarted] = useState(initialSimulationStarted);
    const [FCFS_data, setFCFS_data] = useState([]);
    const [colors, setColors] = useState(['#e30e55', '#3687cf', 'yellow']);
    const [memcurr,setmemcurr] = useState(20);
    const [curridx,setcurridx] = useState(-1);
    const [displayinfo,setdisplayinfo] = useState("No failed Allocation")
    const [processnames, setProcessNames] = useState([
      {
        image: 'https://cdn-icons-png.flaticon.com/512/2503/2503624.png',
        burstTime: 4,
      }
    ]);
  
    let interval;
    function manager(param){
      const queryString = "your_parameter_value"; // replace with your actual parameter value
      const url = `http://127.0.0.1:5000/Bestfit?param=${encodeURIComponent(param)}`;

      fetch(url)
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then(data => {
        // Handle the response data
        console.log(data);
      })
      .catch(error => {
        console.error('Error:', error);
      });

    }
    useEffect(()=>{
      if (props.instpassed!==""){
        if (simulationStarted===false){
          resetToDefaults();
          manager("start");
          setSimulationStarted(true);
          getprogresses(props.instpassed);
          props.setinstpassed("");
        }else{
          getprogresses(props.instpassed);
          props.setinstpassed("");
  
        }
      }
    },[props.instpassed]);
    // useEffect(() => {console.log(occupancies);},[occupancies]);
    useEffect(() => {console.log("current memory updated")},[memcurr]);
    useEffect(() => {
      if (progresses.length!==0){
      const updateSimulation = async () => {
        
        for (const update of progresses) {
          if (update === -1) {
            setcurridx(-1);
            // Reset the display info
            setdisplayinfo("Allocation failed");
          } else {
            const [index, sizeofprocess, willFit] = update;
            setcurridx(index); // Highlight the current index being checked
    
            if (willFit) {
              // Update the occupancies array to reflect the allocation
              var temp = occupancies;
              temp[index].push(sizeofprocess);
              setoccupancies(temp);
              setdisplayinfo(`Best Fit Found at Block ${index+1}`);
              // setoccupancies((prevOccupancies) => {
              //   const newOccupancies = [...prevOccupancies];
              //   newOccupancies[index].push(sizeofprocess);
              //   return newOccupancies;
              // });
            } else {
              // Handle the case where the process doesn't fit
              setdisplayinfo(`No failed Allocation`);
              // You might want to perform additional actions based on the failure
            }
    
            // Wait for a brief moment to visualize the changes
            await new Promise((resolve) => setTimeout(resolve, 300));
            setcurridx(-1);
          setdisplayinfo("No failed Allocation");
    
          // Wait for a brief moment to visualize the changes between steps
          await new Promise((resolve) => setTimeout(resolve, 300));
          }
    
          // Clear the current index highlight and reset the display info
          
        }
      };
    
      // Call the updateSimulation function when progresses array changes
      updateSimulation();
    }
    
      // Additional cleanup or side effects can be added here if needed
    }, [progresses]);
    
    
    
    function getprogresses(param){
      const url = `http://127.0.0.1:5000/Bestfitadd?param=${encodeURIComponent(param)}`;

      fetch(url)
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then(data => {
        // Handle the response data
        setprogresses(data[0]);
        // console.log(progresses);
        console.log(data);
      })
      .catch(error => {
        console.error('Error:', error);
      });

    }
  
    const update = (option) => {
      const newProcess = {
        name: 'P' + (FCFS_data.length + 1),
        arrivalTime: progress,
        burstTime: option,
        runTime: 0,
        completed: false,
      };
      setFCFS_data((prevData) => {
        const newData = [...prevData, newProcess];
        newData.sort((a, b) => a.burstTime - b.burstTime); // Sort by burst time
        return newData;
      });
    };
  
    useEffect(() => {
      if (simulationStarted) {
        interval = setInterval(() => {
          setProgress((prevProgress) => {
            return prevProgress + 1;
          });
  
          // Find the process with the shortest burst time
          const shortestJobIndex = FCFS_data.findIndex((process, index) => {
            return (
              !process.completed && // Exclude completed processes
              process.runTime < process.burstTime
            );
          });
  
          if (shortestJobIndex !== -1) {
            setFCFS_data((prevData) => {
              const newData = [...prevData];
              newData[shortestJobIndex] = {
                ...newData[shortestJobIndex],
                runTime: newData[shortestJobIndex].runTime + 1,
              };
  
              if (newData[shortestJobIndex].runTime === newData[shortestJobIndex].burstTime) {
                // If the process is completed, mark it as completed
                newData[shortestJobIndex].completed = true;
              }
  
              return newData;
            });
          }
        }, 2000); // Reduce the time interval for a more responsive simulation
      } else {
        clearInterval(interval);
      }
  
      return () => {
        clearInterval(interval);
      };
    }, [simulationStarted, FCFS_data]);
  
    const calculateStrokeDashoffset = (progress) => {
      return 503 - (503 * (progress / 100));
    };
  
    const processSize = (process) => {
      const { burstTime, runTime } = process;
  
      if (!simulationStarted) {
        return burstTime * 30;
      } else {
        return burstTime - runTime > 0 ? (burstTime - runTime) * 30 : 0;
      }
    };
  
    const resetToDefaults = () => {
      clearInterval(interval);
      setProgress(initialProgress);
      setSimulationStarted(initialSimulationStarted);
      setFCFS_data([]);
      setoccupancies([[],[],[],[],[],[],[],[],[],[]]);
      setdisplayinfo("No failed Allocation");
    };
  
    return (
      <div className="FCFS">
        <center><h2 style={{color:'white',fontFamily:'fantasy'}}>Best Fit Dynamic Memory Scheduling</h2></center>
        <br />
        <div style={{width:'90%',display:'flex',alignItems:'center',justifyContent:'space-evenly'}}>
        {
            widths.map((width,index1)=>(
                <div style={{marginTop:'30px',width:`${width}%` }}>
                <div className="gantt-chart1" style={(curridx===index1)?{borderColor:'green',opacity:'0.8',scale:'1.1',marginRight:'10px',transition:'0.5s'}:{ overflowX: 'scroll',transition:'0.5s'}}>
                    {occupancies[index1].map((data, index) => (
                        <span
                        className="process-id"
                        style={{
                            backgroundColor: colors[index % 3],
                            height: '90%',
                            borderRadius: '8px',
                        width: `${(data*100)/((width/100)*totalmem)}%`,
                            color: 'white',
                            fontFamily: 'cursive',
                            transition: 'width 1s ease-in-out',
                            fontSize:'10px'
                        }}
                        key={data.name}
                        >
                        &nbsp;{occupancies[index1][index]+"b"}
                        </span>
                    ))}
                    </div>
                    <center><span style={{color:'white',textAlign:'center'}}>{(width/100)*totalmem}b</span></center>
                    </div>
            ))
        
        }
        </div>
        <div className='process-buttons'>
  {processnames.map((processname, index) => (
    <div key={processname.image}>
      <center>
        <img src={processname.image} className='iconproc' onClick={() => {if (simulationStarted){getprogresses(memcurr)} }} alt={processname.burstTime}></img>
      </center>
        <p style={{ color: 'white', marginTop: '-2px' }}>
        <form style={{marginLeft:`${-2*((1000-memcurr)/1000)}%`}}>
          <div style={{ display: 'flex', justifyContent: 'space-evenly', alignItems: 'center',marginLeft:'1%' }}>
            <input
              type="range"
              min="1"
              max="1000"
              value={memcurr}
              onChange={(e) => setmemcurr(parseInt(e.target.value))} disabled={simulationStarted ? false : true}
            /><span style={{ color: 'white', fontFamily: 'fantasy', marginLeft: '5px', marginTop: '-0.5px' }}>{memcurr}</span>
          </div>
        </form>
        </p>
    </div>
  ))}
</div>

  
        <div>
          <button
            style={{ borderRadius: '10px', padding: '10px', color: 'white' }}
            className="custom-btn btn-16"
            onClick={() => {
                if (simulationStarted) {
                    resetToDefaults(); // Reset all values to defaults
                    manager("end");
                  } else {
                    setSimulationStarted(true);
                    manager("start");
                  }
            }}
          >
            {simulationStarted ? 'Stop Simulation' : 'Simulate'}
          </button>
          <div style={{display:'flex',alignItems:'center',justifyContent:'space-evenly'}}>
          <center><p style={{color:'white',fontFamily:'fantasy'}}>{displayinfo}</p><img src={(displayinfo==="No failed Allocation")?"https://cdn2.iconfinder.com/data/icons/perfect-flat-icons-2/512/Ok_check_yes_tick_accept_success_green_correct.png":"https://cdn-icons-png.flaticon.com/512/4436/4436559.png"} style={{width:'30px'}}></img></center>
            </div>
        </div>
      </div>
    );
}

export default Bestfit