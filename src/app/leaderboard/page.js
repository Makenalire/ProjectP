"use client";

import { useEffect, useState } from "react";
import styles from "./leaderboard.board.css";
import Trophy from "public/trophy";

export default function Leaderboard() {
  const [scoreList, setScoreList] = useState([]);
  const getScores = async () => {
    try {
      let res = await fetch("http://localhost:3000/api/score/getScores");
      res = await res.json();
      res.forEach((key) => {
        setScoreList((previousState) => {
          return [...previousState, key];
        });
      });

      setScoreList(res);
    } catch (e) {
      console.log(e);
    }
  };
  useEffect(() => {
    getScores();
  }, []);

  return (
    <main className="screen">
      <div className="scoreRank">
        {scoreList.length > 0 ? (
          scoreList.map((item, index) => {
            if (index !== 0) {
              return (
                <div key={index} className="list-container">
                  <div>{item.name}</div>
                  <div>{item.score}</div>
                </div>
              );
            } else {
              return (
                <div key={index}>
                  <Trophy></Trophy>
                  <div className="name">{item.name}</div>
                  <div className="score">SCORE : {item.score}</div>
                </div>
              );
            }
          })
        ) : (
          <p>Loading...</p>
        )}
      </div>
    </main>
  );
}
