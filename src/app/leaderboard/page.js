"use client";

import { useEffect, useState } from "react";

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
    <main className="">
      <h1>Leaderboard</h1>
      <div className="">
        {scoreList.length > 0 ? (
          scoreList.map((item, index) => {
            return (
              <p className="" key={index}>
                {index + 1} : {item.name} = {item.score} scores
              </p>
            );
          })
        ) : (
          <p>Loading...</p>
        )}
      </div>
    </main>
  );
}
