// Optimal.js

import React, { useState } from 'react';
import './LRU.css'; // Import your CSS file for styling

const OPTIMAL = () => {
  const [pages, setPages] = useState([]);
  const [pageFrames, setPageFrames] = useState(Array(4).fill(null));
  const [pageFaults, setPageFaults] = useState(0);
  const [userInput, setUserInput] = useState('');

  const generateRandomPage = () => {
    const randomPage = Math.floor(Math.random() * 10) + 1;
    setPages([...pages, randomPage]);

    simulateOptimal(randomPage);
  };

  const simulateOptimal = (newPage) => {
    const frameSize = 4;
    const frameQueue = [...pageFrames];

    if (!frameQueue.includes(newPage)) {
      setPageFaults((prevFaults) => prevFaults + 1);

      if (frameQueue.length < frameSize) {
        // If there is space in the frames, add the new page
        frameQueue.push(newPage);
      } else {
        // If all frames are occupied, find the page in the frames that will be used last in the future
        const pagesInFuture = pages.slice(pages.indexOf(newPage) + 1);
        const pagesInFrames = frameQueue.slice();

        const pageToReplace = pagesInFrames.reduce((farthestPage, page, index) => {
          const nextOccurrence = pagesInFuture.indexOf(page);
          return nextOccurrence === -1 || nextOccurrence > pagesInFuture.indexOf(farthestPage) ? page : farthestPage;
        }, frameQueue[0]);

        // Replace the page that will be used last in the future
        const replaceIndex = frameQueue.indexOf(pageToReplace);
        frameQueue[replaceIndex] = newPage;
      }

      setPageFrames([...frameQueue]);
    }
  };

  const testUserInput = () => {
    const inputPages = userInput.split(' ').map((page) => parseInt(page.trim(), 10));

    if (inputPages.length > 0) {
      setPages(inputPages);
      setPageFrames(Array(4).fill(null));
      setPageFaults(0);

      inputPages.forEach((page) => simulateOptimal(page));
    }
  };

  const clearData = () => {
    setPages([]);
    setPageFrames(Array(4).fill(null));
    setPageFaults(0);
    setUserInput('');
  };

  return (
    <div className="optimal-container">
      <div className="button-container">
        <button onClick={generateRandomPage}>Generate Random Page</button>
        <input
          type="text"
          placeholder="Enter a sequence of pages (e.g., 1 2 3)"
          value={userInput}
          onChange={(e) => setUserInput(e.target.value)}
        />
        <button onClick={testUserInput}>Test User Input</button>
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
          <h3>Optimal Page Frames</h3>
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

export default OPTIMAL;
