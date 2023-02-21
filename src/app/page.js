"use client";

import Link from "next/link";
import styles from "./page.module.css";
import { useSelector } from "react-redux";



export default function Home() {
  const highScore = useSelector((state) => state.scoreCount.highScore);
  return (
    // <main className={styles.main}>

    //   <div className={styles.menu}>
    //     <h1>Retro Number Cruncher</h1>
    //     <div>
    //       <Link href="/game" className={styles.buttonGroup}>START</Link>
    //     </div>
    //     <div>
    //       <Link href="/test" className={styles.buttonGroup}>TEST</Link>
    //     </div>
    //     <h3>
    //       {highScore > 0? "Highest Score : " + highScore : null}
    //     </h3>
    //   </div>

    // </main>

    <main className={styles.body}>
      <div className={styles.containerOut}>
        <div className={styles.containerIn}>
          <p className={styles.title}>Retro Number Cruncher</p>
          <div className={styles.boxStartOut}>
            <div className={styles.boxStartIn}>
              <Link className={styles.start} href="/game">START</Link>
            </div>
          </div>
          <h3>
           {highScore > 0? "Highest Score : " + highScore : null}
         </h3>
        </div>
      </div>
           
    </main>
  );
}
