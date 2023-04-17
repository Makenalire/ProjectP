import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Link from "next/link";
import "./styles/modal.css"
import { summary } from "@/redux/score";
const TestModal = ({setShowModal}) => {
    const dispatch = useDispatch();
    const score = useSelector((state) => state.scoreCount.score);
    const highScore = useSelector((state) => state.scoreCount.highScore);
    
  return (
    // <div className={styles.Modal}>
    //   <h3>Highest Score : {highScore}</h3>
    //   <a href="/">Exit</a>
    // </div>
    <div className="modalBackground">
      <div className="modalContainer">
        <div className="titleCloseBtn">
        </div>
        <div className="title">
          <h1> ----  Score  ----</h1>
        </div>
        <div className="body">
          <p>{score}</p> 
          {score > highScore? <p>New Record!</p>: null}
        </div>
        <div className="footer">
            <Link href={"/"} onClick={() => dispatch(summary())} className="back">Main menu</Link>
        </div>
      </div>
    </div>
  );
};

export default TestModal;