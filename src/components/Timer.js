import { summary } from "@/redux/score";
import Link from "next/link";
import React, { useState, useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import TestModal from "./Modal";

const TIME = 40;

function Timer({ propstyle }) {
  const [time, setTime] = useState(TIME);
  const [showModal,setShowModal] = useState(false);
  const timer = useRef();
  const dispatch = useDispatch();

  useEffect(() => {
    clearTimer(TIME);
  }, []);

  useEffect(() => {
    if (time <= 0) {
      clearInterval(timer.current);
      setTime("Time's up!");
      setShowModal(true);
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
      <p className={propstyle}>{formatTime(time)}</p>
      {showModal && <TestModal setShowModal={setShowModal}/>}
    </div>
  );
}

export default Timer;
