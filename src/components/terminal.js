import React, { useEffect, useState } from 'react';
import './terminal.css';

function Terminal(props) {
  const [commands, setCommands] = useState([]);
  const [responses, setResponses] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [terminalart, setTerminalArt] = useState([]);
  const [terminalart2, setTerminalArt2] = useState([]);



  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
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
