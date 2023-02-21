"use client";
import styles from "./game.module.css";
import createQuestion from "@/utils/createQuestion";
import { useEffect, useState } from "react";
import calculateExpression from "@/utils/calExpression";
import Timer from "@/components/Timer";
import { useDispatch, useSelector } from "react-redux";
import { increment, reset } from "@/redux/score";

export default function Game() {
  const [question, setQuestion] = useState([0, 0, 0, 0]);
  const [answer, setAnswer] = useState([""]);
  const [clickedAns, setclickedAns] = useState([]);
  const [checkAnswer, setCheckAnswer] = useState("");
  const dispatch = useDispatch();
  const score = useSelector((state) => state.scoreCount.score);
  
  const addNumber = (number, disabledIds) => {
    setAnswer((previousState) => {
      return [...previousState, number];
    });
    setclickedAns([...clickedAns, disabledIds]);
  };

  const addOperator = (operator) => {
    if (answer.length > 15) {
      return;
    }
    setAnswer((previousState) => {
      return [...previousState, operator];
    });
  };

  useEffect(() => {
    setQuestion(createQuestion());
    dispatch(reset());
  }, []);

  const nextQuestion = () => {
    setQuestion(createQuestion());
    resetAns();
  };

  const submit = () => {
    if (answer.length === 0 || clickedAns.length < 4) {
      return;
    }
    let ans = "";
    for (let ansMember of answer) {
      ans += ansMember;
    }

    const totalValue = calculateExpression(ans);
    if (totalValue === 24) {
      setCheckAnswer("Correct Answer");
      dispatch(increment());
      nextQuestion();
    } else {
      if (isNaN(totalValue)) {
        setCheckAnswer("Incorrect arithmetic expression");
      } else {
        setCheckAnswer("Incorrect Answer");
      }
    }
    console.log("totalValue " + totalValue);
  };

  const resetAns = () => {
    setclickedAns([]);
    setAnswer([""]);
    setCheckAnswer("");
  };

  return (
    <main className={styles.main}>
      <div className={styles.info}>
        <h1 className={styles.scoreText}>SCORE: {score}</h1>
        <Timer />
      </div>
      <div className={styles.numbtnArea}>
        {question.map((item, index) => {
          return (
            <button
              className={styles.numberbtn}
              key={index}
              disabled={clickedAns.includes(index)}
              onClick={() => addNumber(item, index)}
            >
              {item}
            </button>
          );
        })}
      </div>

      <div className={styles.answerArea}>
        {answer.map((item, index) => {
          return (
            <h2 key={index} className={styles.answer}>
              {item}&nbsp;
            </h2>
          );
        })}
      </div>

      <div className={styles.opArea}>
        <button onClick={() => addOperator("+")} className={styles.operatorBtn}>
          +
        </button>
        <button onClick={() => addOperator("-")} className={styles.operatorBtn}>
          -
        </button>
        <button onClick={() => addOperator("*")} className={styles.operatorBtn}>
          *
        </button>
        <button onClick={() => addOperator("/")} className={styles.operatorBtn}>
          /
        </button>
        <button onClick={() => addOperator("(")} className={styles.operatorBtn}>
          {"("}
        </button>
        <button onClick={() => addOperator(")")} className={styles.operatorBtn}>
          {")"}
        </button>
        <button onClick={resetAns} className={styles.operatorBtn}>
          Reset
        </button>
      </div>

      <div className={styles.excArea}>
        <button onClick={nextQuestion} className={styles.excBtn}>
          Skip
        </button>
        <button onClick={submit} className={styles.excBtn}>
          Submit
        </button>
      </div>
      <h1 style={{textAlign:"center"}}>&nbsp;{checkAnswer}</h1>
    </main>
  );
}
