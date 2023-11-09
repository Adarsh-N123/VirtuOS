import React, { useEffect, useState } from 'react'
import "./priority.css"

function Priority() {
    const initialProgress = 0;
  const initialSimulationStarted = false;

  const [progress, setProgress] = useState(initialProgress);
  const [simulationStarted, setSimulationStarted] = useState(initialSimulationStarted);
  const [FCFS_data, setFCFS_data] = useState([]);
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
      newData.sort((a, b) => b.burstTime - a.burstTime); // Sort by burst time
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
          <p className="title">SJF</p>
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
            style={{ strokeDashoffset: calculateStrokeDashoffset(progress) }}
          />
        </svg>
      </div>
      <br />
      <div className="gantt-chart" style={{ overflowX: 'scroll' }}>
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
            &nbsp;{data.name+" "+data.burstTime+":p"}
          </span>
        ))}
      </div>
      <div className='process-buttons'>
        {processnames.map((processname, index) => (
          <div key={processname.image}>
            <img src={processname.image} className='iconproc' onClick={() => { update(processname.burstTime) }} alt={processname.burstTime}></img>
            <center><p style={{ color: 'white', marginTop: '-2px'}}>{processname.burstTime + ":prio"}</p></center>
          </div>
        ))}
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

export default Priority