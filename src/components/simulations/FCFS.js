import React, { useState, useEffect } from 'react';
import './FCFS.css';

function FCFS(props) {
  const initialProgress = 0;
  const initialSimulationStarted = false;
  
  const [progress, setProgress] = useState(initialProgress);
  const [simulationStarted, setSimulationStarted] = useState(initialSimulationStarted);
  const processnames = [["https://static.vecteezy.com/system/resources/previews/026/488/976/original/process-icon-in-flat-style-isolated-on-white-process-symbol-in-black-for-website-design-app-ui-simple-operation-icon-gear-illustration-vector.jpg",4],["https://static.vecteezy.com/system/resources/previews/026/488/978/non_2x/process-icon-in-flat-style-isolated-on-white-process-symbol-in-black-for-website-design-app-ui-simple-operation-icon-gear-illustration-vector.jpg",3],["https://static.vecteezy.com/system/resources/previews/026/488/997/original/process-icon-in-flat-style-isolated-on-white-process-symbol-in-black-for-website-design-app-ui-simple-operation-icon-gear-illustration-vector.jpg",5],["https://cdn-icons-png.flaticon.com/512/1136/1136419.png",2],["https://cdn-icons-png.flaticon.com/512/3862/3862949.png",1]];
  let interval;
  useEffect(()=>{
    if (props.instpassed!==""){
      if (simulationStarted===false){
        resetToDefaults();
        setSimulationStarted(true);
        update(props.instpassed);
        props.setinstpassed("");
      }else{
        update(props.instpassed);
        props.setinstpassed("");

      }
    }
  },[props.instpassed]);
  useEffect(()=>{
    if (props.issim===""){
      setSimulationStarted(false);
      resetToDefaults();
    }else{
      resetToDefaults();
    }
  },[props.issim])

//   const FCFS_data = [
//     ["P1", 0, 2],
//     ["P2", 2, 3],
//     ["P3", 5, 4],
//     ["P4", 9, 2],
//     ["P5", 11, 3]
//   ];
    const [FCFS_data,setFCFS_data] = useState([]);
  
  const colors = ["#e30e55", "#3687cf", "#96c229"];
    const update = (option) =>{
        var temp = FCFS_data;
        if (FCFS_data.length===0){
            temp.push(["P"+(FCFS_data.length+1),progress,option]);
        }else{
            temp.push(["P"+(FCFS_data.length+1),Math.max(temp[temp.length-1][1]+temp[temp.length-1][2],progress),option]);
        }
        setFCFS_data(temp);
    }
  useEffect(() => {
    if (simulationStarted) {
      interval = setInterval(() => {
        setProgress((prevProgress) => {
          return prevProgress + 1;
        });
      }, 2000);
    } else {
      clearInterval(interval);
    }

    return () => {
      clearInterval(interval);
    };
  }, [simulationStarted]);

  const calculateStrokeDashoffset = (progress) => {
    return 503 - (503 * (progress / 100));
  };

  const processSize = (process) => {
    const [_, startTime, duration] = process;
  
    if (!simulationStarted) {
      return duration * 30; // Initial size
    } else if (progress >= startTime) {
      const remainingTime = progress - startTime;
      if (remainingTime <= duration) {
        // Calculate the size with a smooth transition
        const size = 30 * (duration - remainingTime);
        return size;
      }
    }
  
    return duration * 30; // Process is completed
  };

  const resetToDefaults = () => {
    clearInterval(interval);
    setProgress(initialProgress);
    setSimulationStarted(initialSimulationStarted);
    setFCFS_data([]);
  };

  return (
    <div className="FCFS">
      <div className="block">
        <div className="box">
          <p className="number">
            <center>
              <span className="num">{progress}</span>
              <span className="num" style={{ fontSize: '10px', marginLeft: '4px' }}>
                s
              </span>
            </center>
          </p>
          <p className="title">FCFS</p>
        </div>
        <span
          className="dots"
          style={{ transform: `rotate(${360 * (progress / 100)}deg)` }}
        ></span>
        <svg className="svg">
          <circle
            className="circle"
            cx="90"
            cy="90"
            r="80"
            style={{ strokeDashoffset: calculateStrokeDashoffset(progress) }}
          />
        </svg>
      </div>
      <br />
      <div className="gantt-chart" style={{overflowX:'scroll'}}>
        {FCFS_data.map((data, index) => (
        //   <div className="process" key={data[0]}>
            <span
              className="process-id"
              style={(progress<data[1]+data[2])?{
                backgroundColor: colors[index % 3],
                height: '80%',
                borderRadius: '10px',
                marginRight: '5px',
                marginLeft: '3px',
                width: `${processSize(data)}px`,
                color: 'white',
                fontFamily: 'cursive',
                transition: 'all 1s ease-in-out'
              }:{display:'none',transition: 'all 1s ease-in-out'}}
            >
              &nbsp;{data[0]}
            </span>
        //   </div>
        ))}
      </div>
      <div className='process-buttons'>
        {processnames.map((processname) => (
            <div>
            <img src={processname[0]} className='iconproc' onClick={()=>{update(processname[1])}}></img>
            <center><p style={{color:'white',marginTop:'-2px'}}>{processname[1]+"s"}</p></center>
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

export default FCFS;
