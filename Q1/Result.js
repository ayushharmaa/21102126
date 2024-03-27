// Result.js
import React from 'react';

const Result = ({ result }) => {
  return (
    <div>
      <h2>Response</h2>
      <p>Window Previous State: {JSON.stringify(result.windowPrevState)}</p>
      <p>Window Current State: {JSON.stringify(result.windowCurrState)}</p>
      <p>Numbers: {JSON.stringify(result.numbers)}</p>
      <p>Average: {result.avg}</p>
    </div>
  );
};

export default Result;