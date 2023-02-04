import React, { useState, useEffect, useRef } from "react";

function Timer({ start }) {
  const [time, setTime] = useState(10);
  const timer = useRef();

  useEffect(() => {
    clearTimer(10);
  }, []);

  useEffect(() => {
    if (time <= 0) {
      clearInterval(timer.current);
      setTime("Time's up! but you can still play the game.");
    }
  }, [time]);

  const clearTimer = (e) => {
    if (timer.current) clearInterval(timer.current);
    const id = setInterval(() => {
      setTime((time) => time - 1);
    }, 1000);
    timer.current = id;
  };

  const formatTime = (seconds) => {
    if (Number.isInteger(seconds)) {
      const minutes = Math.floor(seconds / 60);
      return `${minutes}:${("0" + (seconds % 60)).slice(-2)}`;
    }
    return seconds;
  };

  return (
    <div style={{ textAlign: "center" }}>
      <h1>{formatTime(time)}</h1>
    </div>
  );
}

export default Timer;
