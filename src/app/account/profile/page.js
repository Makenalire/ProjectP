"use client";

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
    return (<div><p>Welcome, {JSON.stringify(session.user, 2, null)}</p><button onClick={signOut}>Sign Out</button></div>);
  }

  return <h1>Loading...</h1>;
}
