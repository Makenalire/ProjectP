import React, { useState } from "react";
import fetchScore from "@/components/Fetch";

const TestModal = () => {
  const scoreList = <fetchScore/>;

  return (
    <div>
      <ul>
        {scoreList.map((scores) => (
          <li key={scoreList._id}>{scores.score}</li>
        ))}
      </ul>
      <h2>SCORE : 1000</h2>
      <a href="/">EXIT</a>
    </div>
  );
};

export default TestModal;
