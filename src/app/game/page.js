"use client";
import styles from "./game.module.css";
import createQuestion from "@/utils/createQuestion";
import { useEffect, useState } from "react";
import calculateExpression from "@/utils/calExpression";
import Timer from "@/components/Timer";
import { useDispatch, useSelector } from "react-redux";
import { increment, reset } from "@/redux/score";
import Link from "next/link";

export default function Game() {
  const [question, setQuestion] = useState([0, 0, 0, 0]);
  const [answer, setAnswer] = useState([""]);
  const [clickedAns, setclickedAns] = useState([]);
  const [checkAnswer, setCheckAnswer] = useState("");
  const [showScore, setShowScore] = useState(false);
  const [showIncorrect, setShowIncorrect] = useState(false);
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
    setAnswer([""]);
    setCheckAnswer("");
  };

  return (

    <main className={styles.body}>
      <div className={styles.containerOut}>
        <div className={styles.containerIn}>
          <div className={styles.headerContainer}>
            <div className={styles.boxScoreOut}>
              <div className={styles.boxScoreIn}>
                <p className={styles.score}>SCORE : {score}</p>
                
              </div>
            </div>
            {showScore && <p className={styles.scorePlus}> +1 </p>}
            <div className={styles.boxTimeOut}>
              <div className={styles.boxTimeIn}>
                <Timer propstyle={styles.time} />
              </div>
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
          <div className={styles.boxInputOut}>
            <div className={styles.boxInputIn}>
              {answer.map((item, index) => {
                return (
                  <h2 key={index} className={styles.answer}>
                    {item}&nbsp;
                  </h2>
                );
              })}
            </div>
          </div>

          <div className={styles.incorrect}>
            {showIncorrect && <h3>&nbsp;{checkAnswer}</h3>}
          </div>

          <div className={styles.opArea}>
            <button
              onClick={() => addOperator("+")}
              className={styles.operatorBtn}
            >
              +
            </button>
            <button
              onClick={() => addOperator("-")}
              className={styles.operatorBtn}
            >
              -
            </button>
            <button
              onClick={() => addOperator("*")}
              className={styles.operatorBtn}
            >
              *
            </button>
            <button
              onClick={() => addOperator("/")}
              className={styles.operatorBtn}
            >
              /
            </button>
            <button
              onClick={() => addOperator("(")}
              className={styles.operatorBtn}
            >
              {"("}
            </button>
            <button
              onClick={() => addOperator(")")}
              className={styles.operatorBtn}
            >
              {")"}
            </button>
            <button onClick={resetAns} className={styles.operatorBtn}>
              Reset
            </button>
          </div>
          <div className={styles.executionContainer}>
            <div className={styles.boxSkipOut}>
              <div className={styles.boxSkipIn}>
                <button
                  type="button"
                  className={styles.skip}
                  onClick={nextQuestion}
                >
                  SKIP
                </button>
              </div>
            </div>
            <div className={styles.boxSubmitOut}>
              <div className={styles.boxSubmitIn}>
                <button
                  type="submit"
                  className={styles.submit}
                  onClick={submit}
                >
                  SUMBIT
                </button>
              </div>
            </div>
          </div>

          
        </div>
      </div>
    </main>
  );
}
