import { summary } from "@/redux/score";
import Link from "next/link";
import React, { useState, useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import TestModal from "./Modal";
import Exit from "./Exit"

function Timer({ start }) {
  const [showModal,setShowModal] = useState(false);
  const [time, setTime] = useState(10);
  const timer = useRef();
  const dispatch = useDispatch();

  useEffect(() => {
    clearTimer(10);
  }, []);

  useEffect(() => {
    if (time <= 0) {
      clearInterval(timer.current);
      setShowModal(true);
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
    <div>
      <h1>{formatTime(time)}</h1>
      {showModal && <TestModal setShowModal={setShowModal}/>}
    </div>
  );
}

export default Timer;
