// LRU.js

import React, { useState } from 'react';
import './LRU.css'; // Import your CSS file for styling

const LRU = () => {
  const [pages, setPages] = useState([]);
  const [pageFrames, setPageFrames] = useState(Array(4).fill(null));
  const [pageFaults, setPageFaults] = useState(0);
  const [userInput, setUserInput] = useState('');

  const generateRandomPage = () => {
    const randomPage = Math.floor(Math.random() * 10) + 1;
    setPages([...pages, randomPage]);

    simulateLRU(randomPage);
  };

  const simulateLRU = (newPage) => {
    const frameSize = 4;
    const frameQueue = [...pageFrames];

    if (!frameQueue.includes(newPage)) {
      setPageFaults((prevFaults) => prevFaults + 1);

      if (frameQueue.length < frameSize) {
        // If there is space in the frames, add the new page to the front
        frameQueue.unshift(newPage);
      } else {
        // Remove the least recently used page from the end
        frameQueue.pop();
        // Add the new page to the front
        frameQueue.unshift(newPage);
      }

      setPageFrames([...frameQueue]);
    } else {
      // If the page is already in the frame, move it to the front to indicate recent use
      const pageIndex = frameQueue.indexOf(newPage);
      frameQueue.splice(pageIndex, 1);
      frameQueue.unshift(newPage);
      setPageFrames([...frameQueue]);
    }
  };

  const testUserInput = () => {
    const inputPages = userInput.split(' ').map((page) => parseInt(page.trim(), 10));

    if (inputPages.length > 0) {
      setPages(inputPages);
      setPageFrames(Array(4).fill(null));
      setPageFaults(0);

      inputPages.forEach((page) => simulateLRU(page));
    }
  };

  const clearData = () => {
    setPages([]);
    setPageFrames(Array(4).fill(null));
    setPageFaults(0);
    setUserInput('');
  };

  return (
    <div className="lru-container">
      <div className="button-container">
        <button onClick={generateRandomPage}>Generate Random Page</button>
        {/* <input
          type="text"
          placeholder="Enter a sequence of pages (e.g., 1 2 3)"
          value={userInput}
          onChange={(e) => setUserInput(e.target.value)}
        /> */}
        {/* <button onClick={testUserInput}>Test User Input</button> */}
        <button onClick={clearData}>Clear</button>
      </div>
      <div className="simulation-container">
        <div className="pages" style={{width:'60%'}}>
          <h3>Pages</h3>
          {pages.map((page, index) => (
            <div key={index} className="page">
              {page}
            </div>
          ))}
        </div>
        <div className="page-frames">
          <h3>LRU Page Frames</h3>
          {pageFrames.map((frame, index) => (
            <div key={index} className="frame">
              {frame !== null ? frame : '-'}
            </div>
          ))}
        </div>
      </div>
      <div className="stats-container">
        <p>Page Faults: {pageFaults}</p>
      </div>
    </div>
  );
};

export default LRU;
