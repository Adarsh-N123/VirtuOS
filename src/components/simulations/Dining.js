import React, { useState, useEffect } from 'react';
import './Dining.css';
import './Producer.css';

function Dining() {
  const [philosopherStates, setPhilosopherStates] = useState([
    'thinking',
    'thinking',
    'thinking',
    'thinking',
    'thinking',
  ]);

  const [forkStates, setForkStates] = useState([
    'free',
    'free',
    'free',
    'free',
    'free',
  ]);

  const [logs, setLogs] = useState([]);
  const [isSimulationRunning, setIsSimulationRunning] = useState(false);

  const eatingImage = "https://cdn-icons-png.flaticon.com/512/1886/1886743.png";
  const thinkingImage = "https://cdn-icons-png.flaticon.com/512/3755/3755320.png";
  const hungryImage = "https://cdn-icons-png.flaticon.com/512/4117/4117272.png";
  const freeForkImage = "https://cdn-icons-png.flaticon.com/512/1046/1046755.png";
  const inUseForkImage = "https://cdn3.iconfinder.com/data/icons/kitchen-universe-1/140/34_fork-512.png";
  const hungryWithForkImage = "https://cdn-icons-png.flaticon.com/512/4117/4117272.png";

  const philosopherImages = [
    thinkingImage,
    thinkingImage,
    thinkingImage,
    thinkingImage,
    thinkingImage,
  ];

  const forkImages = [
    freeForkImage,
    freeForkImage,
    freeForkImage,
    freeForkImage,
    freeForkImage,
  ];

  const getRandomDuration = () => 2000;

  const handlePickUpFork = (index) => {
    const leftForkIndex = index;
    const rightForkIndex = (index + 1) % 5;

    if (forkStates[leftForkIndex] === 'free') {
      if (forkStates[rightForkIndex] === 'free') {
        const newForkStates = [...forkStates];
        newForkStates[leftForkIndex] = 'in-use';
        newForkStates[rightForkIndex] = 'in-use';

        setForkStates(newForkStates);

        const newPhilosopherStates = [...philosopherStates];
        newPhilosopherStates[index] = 'eating';

        setPhilosopherStates(newPhilosopherStates);

        setLogs((prevLogs) => [
          ...prevLogs,
          `Philosopher ${index} is eating.`,
        ]);
      } else {
        const newForkStates = [...forkStates];
        newForkStates[leftForkIndex] = 'free';

        setForkStates(newForkStates);

        const newPhilosopherStates = [...philosopherStates];
        newPhilosopherStates[index] = 'hungry';
        setPhilosopherStates(newPhilosopherStates);

        setLogs((prevLogs) => [
          ...prevLogs,
          `Philosopher ${index} is hungry and holding a fork.`
        ]);
      }
    } else {
      const newPhilosopherStates = [...philosopherStates];
      newPhilosopherStates[index] = 'hungry';
      setPhilosopherStates(newPhilosopherStates);

      setLogs((prevLogs) => [
        ...prevLogs,
        `Philosopher ${index} is hungry and holding a fork.`
      ]);
    }
  };

  const handlePutDownFork = (index) => {
    const leftForkIndex = index;
    const rightForkIndex = (index + 1) % 5;

    const newForkStates = [...forkStates];
    newForkStates[leftForkIndex] = 'free';
    newForkStates[rightForkIndex] = 'free';

    setForkStates(newForkStates);

    const newPhilosopherStates = [...philosopherStates];
    newPhilosopherStates[index] = 'thinking';

    setPhilosopherStates(newPhilosopherStates);

    setLogs((prevLogs) => [
      ...prevLogs,
      `Philosopher ${index} has finished eating and is thinking.`,
    ]);
  };

  useEffect(() => {
    let intervalId;

    if (isSimulationRunning) {
      intervalId = setInterval(() => {
        const randomPhilosopher = Math.floor(Math.random() * 5);

        const currentState = philosopherStates[randomPhilosopher];

        if (currentState === 'thinking') {
          const newPhilosopherStates = [...philosopherStates];
          newPhilosopherStates[randomPhilosopher] = 'hungry';
          setPhilosopherStates(newPhilosopherStates);

          setLogs((prevLogs) => [
            ...prevLogs,
            `Philosopher ${randomPhilosopher} is hungry.`,
          ]);
        } else if (currentState === 'eating') {
          handlePutDownFork(randomPhilosopher);
        } else if (currentState === 'hungry') {
          const leftForkIndex = randomPhilosopher;
          const rightForkIndex = (randomPhilosopher + 1) % 5;

          if (forkStates[leftForkIndex] === 'free' && forkStates[rightForkIndex] === 'free') {
            const newForkStates = [...forkStates];
            newForkStates[leftForkIndex] = 'in-use';
            newForkStates[rightForkIndex] = 'in-use';
            setForkStates(newForkStates);

            const newPhilosopherStates = [...philosopherStates];
            newPhilosopherStates[randomPhilosopher] = 'eating';
            setPhilosopherStates(newPhilosopherStates);

            setLogs((prevLogs) => [
              ...prevLogs,
              `Philosopher ${randomPhilosopher} is eating.`,
            ]);
          } else if (forkStates[leftForkIndex] === 'free') {
            setLogs((prevLogs) => [
              ...prevLogs,
            //   `Philosopher ${randomPhilosopher} is holding onto the left fork.`,
            ]);
          } else if (forkStates[rightForkIndex] === 'free') {
            setLogs((prevLogs) => [
              ...prevLogs,
            //   `Philosopher ${randomPhilosopher} is holding onto the right fork.`,
            ]);
          } else {
            clearInterval(intervalId);
            setIsSimulationRunning(false);

            const holdingPhilosophers = [
            //   `Philosopher ${randomPhilosopher} is holding the left fork.`,
            //   `Philosopher ${(randomPhilosopher + 1) % 5} is holding the right fork.`,
            ];

            alert('Deadlock detected!');
            setLogs((prevLogs) => [
              ...prevLogs,
              `Deadlock detected! Philosophers are stuck.`,
              ...holdingPhilosophers,
            ]);
          }
        }
      }, 1000);
    }

    return () => clearInterval(intervalId);
  }, [isSimulationRunning, philosopherStates, forkStates]);

  const startSimulation = () => {
    setIsSimulationRunning(true);
  };

  const stopSimulation = () => {
    setIsSimulationRunning(false);
  };

  const resetSimulation = () => {
    setPhilosopherStates(['thinking', 'thinking', 'thinking', 'thinking', 'thinking']);
    setForkStates(['free', 'free', 'free', 'free', 'free']);
    setLogs([]);
    stopSimulation();
  };

  function resolve(index) {
    return index === 0 ? 4 : index - 1;
  }

  return (
    <div>
      <div style={{ overflow: 'scroll', height: '100%', display: 'flex', width: '100%', flexWrap: 'wrap' }}>
        <div className="dining-container">
          <div className="circle-container">
            {philosopherImages.map((image, index) => (
              <div
                key={index}
                className={`circle-item philosopher-item-${index + 1}`}
              >
                <img
                  src={
                    philosopherStates[resolve(index)] === 'eating'
                      ? eatingImage
                      : philosopherStates[resolve(index)] === 'hungry'
                      ? hungryWithForkImage
                      : image
                  }
                  alt={`Philosopher ${index}`}
                  className="philosopher-image"
                />
                <span style={{ color: 'white', fontSize: '9px' }}>Philosopher {index}</span>
              </div>
            ))}

            {forkImages.map((image, index) => (
              <div key={index} className={`circle-item fork-item-${index + 1}`}>
                <img
                  src={
                    forkStates[index] === 'in-use' ? inUseForkImage : freeForkImage
                  }
                  alt={`Fork ${index + 1}`}
                  className="fork-image"
                />
              </div>
            ))}
          </div>
        </div>
        <div>
        </div>
        <div style={{ width: '350px', height: '300px', marginTop: '50px', marginLeft: '250px', borderStyle: 'solid', borderColor: 'white', borderWidth: '3px', overflow: 'scroll', borderRadius: '5px' }} className='logs'>
          <br></br>
          <center><span style={{ color: 'white', fontFamily: 'fantasy', fontSize: '18px', marginTop: '10px', marginBottom: '20px' }}>Logs</span></center>
          <br></br>
          {logs.map((log, index) => (
            <div key={index} style={{ color: 'white', fontFamily: 'monospace', marginLeft: '20px' }}>
              {log}
            </div>
          ))}
          <br></br>
        </div>
      </div>
      <div style={{ marginTop: '-20vh' }}>
        <center>
          <button onClick={resetSimulation} className='custom-btn btn-7'>Reset</button>
          <button onClick={isSimulationRunning ? stopSimulation : startSimulation} className='custom-btn btn-7'>
            {isSimulationRunning ? 'Stop' : 'Start'}
          </button>
        </center>
      </div>
    </div>
  );
}

export default Dining;
