import React, { useEffect, useState } from 'react'
import "./firstfit.css"

function Firstfit() {
    const initialProgress = 0;
    const initialSimulationStarted = false;
    const [widths,setwidths] = useState([10,5,7,9,20,11,15,8,10,5]);
    const [occupancies,setoccupancies] = useState([[],[],[],[],[],[],[],[],[],[]]);
    const totalmem = 1000;
  
    const [progress, setProgress] = useState(initialProgress);
    const [simulationStarted, setSimulationStarted] = useState(initialSimulationStarted);
    const [FCFS_data, setFCFS_data] = useState([]);
    const [colors, setColors] = useState(['#e30e55', '#3687cf', 'yellow']);
    const [memcurr,setmemcurr] = useState(20);
    const [processnames, setProcessNames] = useState([
      {
        image: 'https://cdn-icons-png.flaticon.com/512/2503/2503624.png',
        burstTime: 4,
      }
    ]);
  
    let interval;
  
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
    };
  
    return (
      <div className="FCFS">
        <center><h2 style={{color:'white',fontFamily:'fantasy'}}>First Fit Dynamic Memory Scheduling</h2></center>
        <br />
        <div style={{width:'90%',display:'flex',alignItems:'center',justifyContent:'space-evenly'}}>
        {
            widths.map((width,index1)=>(
                <div style={{marginTop:'30px',width:`${width}%` }}>
                <div className="gantt-chart1" style={{ overflowX: 'scroll'}}>
                    {FCFS_data.map((data, index) => (
                        <span
                        className="process-id"
                        style={processSize(data) > 0 ? {
                            backgroundColor: colors[index % 3],
                            height: '80%',
                            borderRadius: '10px',
                            marginRight: '5px',
                            marginLeft: '3px',
                            width: `${processSize(data)}px`,
                            color: 'white',
                            fontFamily: 'cursive',
                            transition: 'width 1s ease-in-out',
                            fontSize:'14px'
                        } : { display: 'none' }}
                        key={data.name}
                        >
                        &nbsp;{data.name+" "+data.burstTime+"s"}
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
        <img src={processname.image} className='iconproc' onClick={() => { update(memcurr) }} alt={processname.burstTime}></img>
      </center>
        <p style={{ color: 'white', marginTop: '-2px' }}>
        <form style={{marginLeft:`${-2*((1000-memcurr)/1000)}%`}}>
          <div style={{ display: 'flex', justifyContent: 'space-evenly', alignItems: 'center',marginLeft:'1%' }}>
            <input
              type="range"
              min="1"
              max="1000"
              value={memcurr}
              onChange={(e) => setmemcurr(parseInt(e.target.value))} disabled={simulationStarted ? true : false}
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
                  } else {
                    setSimulationStarted(true);
                  }
            }}
          >
            {simulationStarted ? 'Stop Simulation' : 'Simulate'}
          </button>
        </div>
      </div>
    );
}

export default Firstfit