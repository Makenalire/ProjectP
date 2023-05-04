"use client";

import styles from "./profile.module.css";
import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";

export default function Profile() {
  const router = useRouter();
  const { data: session, status } = useSession();
  const [highScore, setHighScore] = useState("loading...");

  useEffect(() => {
    if (!session && status !== "loading") {
      console.log("session = " + session + "status = " + status);
      router.replace("../account");
    }
  }, [session, status, router]);

  const getHighScore = async () => {
    let res = await fetch(
      "http://localhost:3000/api/score?id=" + session.user.id
    );
    res = await res.json();
    if (res) {
      setHighScore(res.score);
    } else {
      setHighScore("N/A");
    }
  };

  if (session) {
    getHighScore();

    return (
      <main className={styles.body}>
        <div>
          <p>-[ {session.user.name} ]-</p>
          <p>Email : {session.user.email}</p>
          <p>Highest Score : {highScore}</p>
          <button className={styles.signout} onClick={signOut}>
            Sign Out
          </button>
        </div>
      </main>
    );
  }

  return <p>Loading...</p>;
}
