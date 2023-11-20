// MRU.js

import React, { useState } from 'react';
import './LRU.css'; // Import your CSS file for styling

const MRU = () => {
  const [pages, setPages] = useState([]);
  const [pageFrames, setPageFrames] = useState(Array(4).fill(null));
  const [pageFaults, setPageFaults] = useState(0);
  const [userInput, setUserInput] = useState('');

  const generateRandomPage = () => {
    const randomPage = Math.floor(Math.random() * 10) + 1;
    setPages([...pages, randomPage]);

    simulateMRU(randomPage);
  };

  const simulateMRU = (newPage) => {
    const frameSize = 4;
    const frameQueue = [...pageFrames];

    if (!frameQueue.includes(newPage)) {
      setPageFaults((prevFaults) => prevFaults + 1);

      if (frameQueue.length < frameSize) {
        // If there is space in the frames, add the new page to the front
        frameQueue.unshift(newPage);
      } else {
        // Check if any of the most recently used pages are in the frame
        const recentlyUsedPages = pages.slice(0, frameSize);
        const replaceablePages = frameQueue.filter(page => !recentlyUsedPages.includes(page));

        // If there are replaceable pages, replace the most recently used among them
        if (replaceablePages.length > 0) {
          const replacePageIndex = frameQueue.indexOf(replaceablePages[0]);
          frameQueue.splice(replacePageIndex, 1, newPage);
        } else {
          // If all pages in the frame are recently used, replace the most recently used one
          frameQueue.shift();
          frameQueue.unshift(newPage);
        }
      }

      // Set the page frames state after replacement or placing in an empty frame
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

      inputPages.forEach((page) => simulateMRU(page));
    }
  };

  const clearData = () => {
    setPages([]);
    setPageFrames(Array(4).fill(null));
    setPageFaults(0);
    setUserInput('');
  };

  return (
    <div className="mru-container">
      <div className="button-container">
        <button onClick={generateRandomPage}>Generate Random Page</button>
        {/* Uncomment the following lines if you want to test user input */}
        {/* <input
          type="text"
          placeholder="Enter a sequence of pages (e.g., 1 2 3)"
          value={userInput}
          onChange={(e) => setUserInput(e.target.value)}
        />
        <button onClick={testUserInput}>Test User Input</button> */}
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
          <h3>MRU Page Frames</h3>
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

export default MRU;
