import { summary } from "@/redux/score";
import Link from "next/link";
import React, { useState, useEffect, useRef } from "react";
import { useDispatch } from "react-redux";

function Timer({ start }) {
  const [time, setTime] = useState(10);
  const timer = useRef();
  const dispatch = useDispatch();

  useEffect(() => {
    clearTimer(10);
  }, []);

  useEffect(() => {
    if (time <= 0) {
      clearInterval(timer.current);
      setTime(<Link href={"/"}>Back</Link>);
      dispatch(summary());
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
