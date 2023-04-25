"use client";
// import { authOptions } from "@/pages/api/auth/[...nextauth]";
// import { getServerSession } from "next-auth";
import { useSession } from "next-auth/react";
import Link from "next/link";

export default function AccountHeader() {
  //const session = await getServerSession(authOptions)
  const { data: session, status } = useSession();

  if (status === "loading") {
    return <p>Loading...</p>;
  }

  if (session) {
    return (
      <p>
        Welcome,{" "}
        <Link style={{ color: "#ffc745" }} href="/account/profile">
          {session.user.name}
        </Link>
      </p>
    );
  } else {
    return (
      <p>
        <Link href="/account" style={{ color: "#FFF" }}>
          SIGN IN
        </Link>
      </p>
    );
  }
}
