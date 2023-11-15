import React, { useEffect, useState } from 'react';
import './RoundRobin.css';

function RoundRobin(props) {
    const initialProgress = 0;
    const initialSimulationStarted = false;
  
    const [progress, setProgress] = useState(initialProgress);
    const [simulationStarted, setSimulationStarted] = useState(initialSimulationStarted);
    const [processQueue, setProcessQueue] = useState([]);
    const [waitQueue, setWaitQueue] = useState([]);
    const [timeQuantum, setTimeQuantum] = useState(1);
    const [colors, setColors] = useState(['#e30e55', '#3687cf', 'yellow']);
    
    const [processnames, setProcessNames] = useState([
      {
        image: 'https://static.vecteezy.com/system/resources/previews/026/488/976/original/process-icon-in-flat-style-isolated-on-white-process-symbol-in-black-for-website-design-app-ui-simple-operation-icon-gear-illustration-vector.jpg',
        burstTime: 4,
      },
      {
        image: 'https://static.vecteezy.com/system/resources/previews/026/488/978/non_2x/process-icon-in-flat-style-isolated-on-white-process-symbol-in-black-for-website-design-app-ui-simple-operation-icon-gear-illustration-vector.jpg',
        burstTime: 3,
      },
      {
        image: 'https://static.vecteezy.com/system/resources/previews/026/488/997/original/process-icon-in-flat-style-isolated-on-white-process-symbol-in-black-for-website-design-app-ui-simple-operation-icon-gear-illustration-vector.jpg',
        burstTime: 5,
      },
      {
        image: 'https://cdn-icons-png.flaticon.com/512/1136/1136419.png',
        burstTime: 2,
      },
      {
        image: 'https://cdn-icons-png.flaticon.com/512/3862/3862949.png',
        burstTime: 1,
      },
    ]);
  
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
  
    const addProcessToWaitQueue = (burstTime, runTime, name, color) => {
      const newProcess = {
        name: name || 'P' + (processQueue.length + waitQueue.length + 1),
        burstTime: burstTime,
        runTime: runTime,
        color: color || colors[(processQueue.length + waitQueue.length) % 3],
        completed: false,
      };
      if (waitQueue.length===0 && processQueue.length===0){
        setProcessQueue([newProcess]);
      }else{
      setWaitQueue([...waitQueue, newProcess]);
      }
    };
  
    const update = (option) => {
      addProcessToWaitQueue(option);
    };
  
    useEffect(() => {
      if (simulationStarted) {
        interval = setInterval(() => {
          setProgress((prevProgress) => prevProgress + 1);
  
          if (processQueue.length > 0) {
            const currentProcess = processQueue[0];
            if (currentProcess.burstTime > timeQuantum) {
              // Execute for a time quantum and update burst time
              currentProcess.burstTime -= timeQuantum;
              const nextProcess = { ...currentProcess }; // Create a copy of the current process
              processQueue.shift(); // Remove the current process
              
              setProcessQueue(processQueue);
              if (waitQueue.length > 0) {
                waitQueue.push(currentProcess);
                setWaitQueue(waitQueue);
              }
              if (waitQueue.length > 0) {
                // Move the first process from the wait queue to the process queue
                const nextProcessFromWaitQueue = waitQueue.shift();
                // nextProcessFromWaitQueue.runTime += timeQuantum; // Update runTime
                nextProcessFromWaitQueue.completed =
                  nextProcessFromWaitQueue.runTime >= nextProcessFromWaitQueue.burstTime;
                  
                setProcessQueue([nextProcessFromWaitQueue]);
              } else {
                setProcessQueue([nextProcess]);
              }
            } else {
              // Process has completed execution
              processQueue.shift();
              if (waitQueue.length > 0) {
                // Move the first process from the wait queue to the process queue
                const nextProcessFromWaitQueue = waitQueue.shift();
                // nextProcessFromWaitQueue.runTime += timeQuantum; // Update runTime
                nextProcessFromWaitQueue.completed =
                  nextProcessFromWaitQueue.runTime >= nextProcessFromWaitQueue.burstTime;
                  
                setProcessQueue([nextProcessFromWaitQueue]);
                setWaitQueue(waitQueue);
              }
            }
          } else {
            if (waitQueue.length > 0) {
              // Move the first process from the wait queue to the process queue
              const nextProcess = waitQueue.shift();
              setProcessQueue((prevQueue) => [...prevQueue, nextProcess]);
            }
          }
        }, 2000);
      } else {
        clearInterval(interval);
      }
  
      return () => {
        clearInterval(interval);
      };
    }, [simulationStarted, processQueue, waitQueue, timeQuantum]);
  
    const resetToDefaults = () => {
      clearInterval(interval);
      setProgress(initialProgress);
      setSimulationStarted(initialSimulationStarted);
      setProcessQueue([]);
      setWaitQueue([]);
      setTimeQuantum(1);
    };

  return (
    <div className="FCFS">
      <div className="block">
        <div className="box">
          <p className="number">
            <center>
              <span className="num">{progress}</span>
              <span className="num" style={{ fontSize: '10px', marginLeft: '4px' }}>
                TQ
              </span>
            </center>
          </p>
          <p className="title">RR</p>
        </div>
        <span
          className="dots"
          style={{ transform: `rotate(${360 * (progress / 100)}deg` }}
        ></span>
        <svg className="svg">
          <circle
            className="circle"
            cx="90"
            cy="90"
            r="80"
            style={{ strokeDashoffset: 503 - (503 * (progress / 100)) }}
          />
        </svg>
      </div>
      <br />
      <label htmlFor="range1" style={{ color: 'white', fontFamily: 'fantasy' }}>
        Process Queue
      </label>
      <div className="gantt-chart" style={{ overflowX: 'scroll' }}>
        {processQueue.map((data, index) => (
          <span
            className="process-id"
            style={data.burstTime > 0 ? {
              backgroundColor: data.color,
              height: '80%',
              borderRadius: '10px',
              marginRight: '5px',
              marginLeft: '3px',
              width: `${data.burstTime * 30}px`,
              color: 'white',
              fontFamily: 'cursive',
              transition: 'width 1s ease-in-out',
              fontSize: '14px'
            } : { display: 'none' }}
            key={data.name}
          >
            &nbsp;{data.name}
          </span>
        ))}
      </div>
      <label htmlFor="range1" style={{ color: 'white', fontFamily: 'fantasy', marginTop: '20px' }}>Ready Queue</label>
      <div className="gantt-chart" style={{ overflowX: 'scroll' }}>
        {waitQueue.map((data, index) => (
          <span
            className="process-id"
            style={data.burstTime > 0 ? {
              backgroundColor: data.color,
              height: '80%',
              borderRadius: '10px',
              marginRight: '5px',
              marginLeft: '3px',
              width: `${data.burstTime * 30}px`,
              color: 'white',
              fontFamily: 'cursive',
              transition: 'width 1s ease-in-out',
              fontSize: '14px'
            } : { display: 'none' }}
            key={data.name}
          >
            &nbsp;{data.name}
          </span>
        ))}
      </div>
      <div className='process-buttons'>
        {processnames.map((processname, index) => (
          <div key={processname.image}>
            <img src={processname.image} className='iconproc' onClick={() => { update(processname.burstTime) }} alt={processname.burstTime}></img>
            <center><p style={{ color: 'white', marginTop: '-2px' }}>{processname.burstTime + "s"}</p></center>
          </div>
        ))}
      </div>
      <div style={{ marginTop: '30px', marginLeft: '-30px' }}>
        <form>
          <label htmlFor="range1" style={{ color: 'white', fontFamily: 'fantasy' }}>Time Quantum</label>
          <div style={{ display: 'flex', justifyContent: 'space-evenly', alignItems: 'center' }}>
            <input
              type="range"
              min="1"
              max="9"
              value={timeQuantum}
              onChange={(e) => setTimeQuantum(parseInt(e.target.value))} disabled={simulationStarted ? true : false}
            /><span style={{ color: 'white', fontFamily: 'fantasy', marginLeft: '5px', marginTop: '-0.5px' }}>{timeQuantum}</span>
          </div>
        </form>
      </div>
      <div>
        <button
          style={{ borderRadius: '10px', padding: '10px', color: 'white' }}
          className="custom-btn btn-16"
          onClick={() => {
            if (simulationStarted) {
              resetToDefaults();
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

export default RoundRobin;
