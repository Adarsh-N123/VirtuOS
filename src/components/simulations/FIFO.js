import React, { useState } from 'react';
import './FIFO.css'; // Import your CSS file for styling

const FIFO = () => {
  const [pages, setPages] = useState([]);
  const [pageFrames, setPageFrames] = useState(Array(3).fill(null));
  const [pageFaults, setPageFaults] = useState(0);

  const generateRandomPage = () => {
    const randomPage = Math.floor(Math.random() * 10) + 1;
    setPages([...pages, randomPage]);

    simulateFIFO(randomPage);
  };

  const simulateFIFO = (newPage) => {
    const frameSize = 3;
    const frameQueue = [...pageFrames];

    if (!frameQueue.includes(newPage)) {
      setPageFaults((prevFaults) => prevFaults + 1);

      if (frameQueue.length < frameSize) {
        frameQueue.push(newPage);
      } else {
        const removedPage = frameQueue.shift();
        frameQueue.push(newPage);

        setPageFrames([...frameQueue]);
      }
    }
  };

  const clearData = () => {
    setPages([]);
    setPageFrames(Array(3).fill(null));
    setPageFaults(0);
  };

  return (
    <div className="fifo-container">
      <div className="button-container">
        <button onClick={generateRandomPage}>Add New Page Reference</button>
        <button onClick={clearData}>Clear</button>
      </div>
      <div className="simulation-container">
        <div className="pages" style={{ width: '60%' }}>
          <h3>Pages</h3>
          {pages.map((page, index) => (
            <div key={index} className="page">
              {page}
            </div>
          ))}
        </div>
        <div className="page-frames">
          <h3>Page Frames</h3>
          {pageFrames.map((frame, index) => (
            <div key={index} className="frame">
              {frame !== null ? frame : '-'}
            </div>
          ))}
        </div>
      </div>
      <div className="stats-container">
        <p>Page Faults: {pageFaults}</p>
        {/* Other statistics go here */}
      </div>
    </div>
  );
};

export default FIFO;
