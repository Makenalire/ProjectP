import React, { useState, useEffect } from 'react';

function Timer() {
  const [time, setTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [intervalId, setIntervalId] = useState(null);
  const [savedTime, setSavedTime] = useState([]);

  useEffect(() => {
    if (!isRunning) {
      clearInterval(intervalId);
    }
  }, [isRunning, intervalId]);

  const handleStart = () => {
    setIsRunning(true);
    const id = setInterval(() => {
      setTime(time => time + 1);
    }, 1000);
    setIntervalId(id);
  };

  const handleStop = () => {
    setIsRunning(false);
    setSavedTime([...savedTime, time]);
    setIsRunning(false);

  };

  const handleSave = () => {
    setSavedTime([...savedTime, time]);
    setIsRunning(false);
  };

  const resetTime = () => {
    setTime(0);
  }

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    return `${minutes}:${("0" + (seconds % 60)).slice(-2)}`;
  };

  return (
    <div style={{textAlign: 'center'}}>
      <h1>{formatTime(time)}</h1>
      {!isRunning && <button onClick={handleStart}>Start</button>}
      {isRunning && <button onClick={handleStop}>Stop</button>}
      <button onClick={handleSave}>Save</button>
      <button onClick={resetTime}>reset</button>
      <ul>
        {savedTime.map((t, index) => (
          <li key={index}>{formatTime(t)}</li>
        ))}
      </ul>
    </div>
  );
}

export default Timer;

