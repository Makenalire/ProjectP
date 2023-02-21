import React, { useState } from "react";
import { useSelector } from "react-redux";
import Link from "next/link";
import "./modal.css"
const TestModal = ({setShowModal}) => {
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
          <h1> ----  High Score  ----</h1>
        </div>
        <div className="body">
          <p>{highScore}</p>
        </div>
        <div className="footer">
            <button><Link cancelBtn href={"/"}>Main menu</Link></button>
        </div>
      </div>
    </div>
  );
};

export default TestModal;
