"use client";
import styles from "./game.module.css";
import createQuestion from "@/utils/createQuestion";
import { useEffect, useRef, useState } from "react";
import calculateExpression from "@/utils/calExpression";
import Timer from "@/components/Timer";
import { useDispatch, useSelector } from "react-redux";
import { increment, reset } from "@/redux/score";
import Link from "next/link";
import RotateIcon from "public/rotateRight";

export default function Game() {
  const [question, setQuestion] = useState([0, 0, 0, 0]);
  const [displayAnswer, setDisplayAnswer] = useState([""]);
  const [clickedAns, setclickedAns] = useState([]);
  const [checkAnswer, setCheckAnswer] = useState("");
  const [showScore, setShowScore] = useState(false);
  const [showIncorrect, setShowIncorrect] = useState(false);
  const answer = useRef("");
  const dispatch = useDispatch();
  const score = useSelector((state) => state.scoreCount.score);

  const addNumber = (number, disabledIds) => {
    setDisplayAnswer((previousState) => {
      return [...previousState, number];
    });
    setclickedAns([...clickedAns, disabledIds]);
    answer.current = answer.current + number;
  };

  const addOperator = (display, operator) => {
    if (displayAnswer.length > 15) {
      return;
    }
    setDisplayAnswer((previousState) => {
      return [...previousState, display];
    });
    answer.current = answer.current + operator;
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
    if (answer.current.length === 0 || clickedAns.length < 4) {
      return;
    }

    const totalValue = calculateExpression(answer.current);
    if (totalValue === 24) {
      setShowScore(true);
      setTimeout(() => setShowScore(false), 2000);
      dispatch(increment());
      nextQuestion();
    } else {
      if (isNaN(totalValue)) {
        setCheckAnswer("Incorrect arithmetic expression");
      } else {
        setCheckAnswer("Incorrect Answer");
      }
      setShowIncorrect(true);
      setTimeout(() => setShowIncorrect(false), 1000);
    }
    console.log("totalValue " + totalValue);
  };

  const resetAns = () => {
    setclickedAns([]);
    setDisplayAnswer([""]);
    setCheckAnswer("");
    answer.current = "";
  };

  return (
    <main className={styles.body}>
      <div className={styles.headerContainer}>
        <div className={styles.headerBorder}>
          <p className={styles.headerText}>SCORE : {score}</p>
        </div>
        {showScore && <p className={styles.scorePlus}> +1 </p>}
        <div className={styles.headerBorder}>
          <Timer propstyle={styles.headerText} />
        </div>
      </div>
      <div className={styles.numbtnArea}>
        {question.map((item, index) => {
          return (
            <button
              className={styles.number}
              key={index}
              disabled={clickedAns.includes(index)}
              onClick={() => addNumber(item, index)}
            >
              {item}
            </button>
          );
        })}
      </div>
      <p className={styles.anstxt}>YOUR ANSWER</p>
      <div className={styles.inputBorder}>
        {displayAnswer.map((item, index) => {
          return (
            <h2 key={index} className={styles.answer}>
              {item}&nbsp;
            </h2>
          );
        })}
      </div>

      <div className={styles.incorrect}>
        {showIncorrect && <h3>&nbsp;{checkAnswer}</h3>}
      </div>

      <div className={styles.opArea}>
        <button onClick={() => addOperator("+", "+")} className={styles.operatorBtn}>
          +
        </button>
        <button onClick={() => addOperator("-", "-")} className={styles.operatorBtn}>
          -
        </button>
        <button onClick={() => addOperator("\u00D7", "*")} className={styles.operatorBtn}>
          {"\u00D7"}
        </button>
        <button onClick={() => addOperator("\u00F7", "/")} className={styles.operatorBtn}>
          {"\u00F7"}
        </button>
        <button onClick={() => addOperator("(", "(")} className={styles.operatorBtn}>
          {"("}
        </button>
        <button onClick={() => addOperator(")", ")")} className={styles.operatorBtn}>
          {")"}
        </button>
        <button onClick={resetAns} className={styles.operatorBtn}>
          Reset
        </button>
      </div>
      <div className={styles.executionContainer}>
        <div className={styles.skipBorder}>
          <button type="button" className={styles.skip} onClick={nextQuestion}>
            <RotateIcon color="#FF2B9D" /> SKIP NUMBER
          </button>
        </div>
        <div className={styles.submitBorder}>
          <button type="submit" className={styles.submit} onClick={submit}>
            SUMBIT
          </button>
        </div>
      </div>
    </main>
  );
}
