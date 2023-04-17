"use client";

import { useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function AccountHeader() {
  const router = useRouter();
  const { data: session, status } = useSession();

  if (status === "loading") {
    return <p>Loading...</p>;
  }

  if (session) {
    return <p>Welcome, {session.user.name}</p>;
  } else {
    return (
      <Link href="/account" style={{color: "#FFF"}}>
        SIGN IN
      </Link>
    );
  }
}
