import React, { useState, useEffect } from 'react';
import './Producer.css';

const BUFFER_SIZE = 8;

const getRandomDuration = () => Math.random() * (3 - 0.5) + 0.5; // Random duration between 0.5 and 3 seconds

function Producer() {
  const [buffer, setBuffer] = useState(Array(BUFFER_SIZE).fill(null));
  const [inIndex, setInIndex] = useState(0);
  const [outIndex, setOutIndex] = useState(0);
  const [count, setCount] = useState(0);
  const [registerP, setRegisterP] = useState(0);
  const [registerC, setRegisterC] = useState(0);
  const [logs, setLogs] = useState([]);
  const [mutex, setMutex] = useState(false);

  // Function to scroll the div to the bottom
  function scrollToBottom() {
    var scrollableDiv = document.getElementsByClassName('scrollableDiv')[0];
    scrollableDiv.scrollTop = scrollableDiv.scrollHeight * 2;
  }
  useEffect(() => {
    scrollToBottom();
  }, [logs]);

  const produceItem = () => {
    const newItem = 'F';

    if (count === BUFFER_SIZE || mutex) {
      addToLogs('Producer is waiting...');
      alert('Wait for the consumer to finish before producing.');
      return;
    }

    setMutex(true); // Acquire mutex
    buffer[inIndex] = newItem;
    setInIndex((inIndex + 1) % BUFFER_SIZE);
    setRegisterP(count + 1);
    addToLogs(`Producer: Inserted ${newItem}. Count: ${count + 1}`);

    // Simulate context switch by introducing a delay before updating count
    setTimeout(() => {
      setCount(count + 1);
      setRegisterP(count + 1);
      setMutex(false); // Release mutex
    }, getRandomDuration() * 1000);
  };

  const consumeItem = () => {
    if (count === 0 || mutex) {
      addToLogs('Consumer is waiting...');
      alert('Wait for the producer to finish before consuming.');
      return;
    }

    setMutex(true); // Acquire mutex
    const consumedItem = buffer[outIndex];
    buffer[outIndex] = null;
    setOutIndex((outIndex + 1) % BUFFER_SIZE);
    setRegisterC(count - 1);
    addToLogs(`Consumer: Consumed ${consumedItem}. Count: ${count - 1}`);

    // Simulate context switch by introducing a delay before updating count
    setTimeout(() => {
      setCount(count - 1);
      setRegisterC(count - 1);
      setMutex(false); // Release mutex
    }, getRandomDuration() * 1000);
  };

  const addToLogs = (message) => {
    setLogs((prevLogs) => [...prevLogs, message]);
  };

//   useEffect(() => {
//     // Log initial state
//     addToLogs(`Initial state: Count: ${count}, RegisterP: ${registerP}, RegisterC: ${registerC}`);

//     // Simulate initial context switch from Producer to Consumer
//     setTimeout(() => {
//       consumeItem();
//     }, getRandomDuration() * 1000);
//   }, []);

  useEffect(() => {
    // Log state after each context switch
    addToLogs(`Context Switch: Count: ${count}, RegisterP: ${registerP}, RegisterC: ${registerC}`);
  }, [count, registerP, registerC]);

  const resetState = () => {
    setBuffer(Array(BUFFER_SIZE).fill(null));
    setInIndex(0);
    setOutIndex(0);
    setCount(0);
    setRegisterP(0);
    setRegisterC(0);
    setLogs([]);
    setMutex(false);
  };

  return (
    <div style={{ textAlign: 'center' }}>
      <h2 style={{ color: 'white', fontFamily: 'monospace' }}>Producer-Consumer Problem</h2>
      <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '10px' }}>
        <p style={{ color: 'white', fontFamily: 'monospace', margin: '0' }}>Count: {count}</p>
        <p style={{ color: 'white', fontFamily: 'monospace', margin: '0', marginLeft: '10px' }}>Buffer Size: {BUFFER_SIZE}</p>
        <p style={{ color: 'white', fontFamily: 'monospace', margin: '0', marginLeft: '10px' }}>RegisterP: {registerP}</p>
        <p style={{ color: 'white', fontFamily: 'monospace', margin: '0', marginLeft: '10px' }}>RegisterC: {registerC}</p>
      </div>
      <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}>
        {buffer.map((item, index) => (
          <div key={index} style={getBoxStyle(index)}>
            {item && <span style={{ color: item === 'F' ? 'white' : 'gray' }}>{item}</span>}
          </div>
        ))}
      </div>
      <div style={{ marginTop: '20px', color: 'white', fontFamily: 'monospace' }}>
        <h3>Logs:</h3>
        <center>
          <div className='scrollableDiv' style={{ width: '80%', height: '200px', overflow: 'scroll', borderStyle: 'solid', borderColor: 'white' }}>
            {logs.map((log, index) => (
              <p key={index}>{log}</p>
            ))}
          </div>
        </center>
      </div>
      <button onClick={produceItem} className='custom-btn btn-7'>
        Produce Item
      </button>
      <button onClick={consumeItem} className='custom-btn btn-7'>
        Consume Item
      </button>
      <button onClick={resetState} className='custom-btn btn-7'>
        Reset
      </button>
    </div>
  );
}

const getBoxStyle = (index) => {
  return {
    width: '50px',
    height: '50px',
    backgroundColor: 'gray',
    borderColor: 'white',
    borderRadius: '50%',
    border: '3px solid white',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontWeight: 'bold',
    margin: '5px',
    color: 'black',
  };
};

export default Producer;
