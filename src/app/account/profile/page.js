"use client";

import styles from "./profile.module.css";
import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Profile() {
  const router = useRouter();
  const { data: session, status } = useSession();
  

  useEffect(() => {
    if (!session && status !== "loading") {
        console.log("session = " + session + "status = " + status);
        router.replace("../account");
    }
  }, [session, status, router]);

  if (session) {
    return (<main className={styles.body}><div><p>Welcome, {session.user.name}</p><button className={styles.signout} onClick={signOut}>Sign Out</button></div></main>);
  }

  return <p>Loading...</p>;
}
