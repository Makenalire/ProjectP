"use client";

import styles from "./account.module.css";
import { useFormik } from "formik";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { loginValidate } from "@/lib/formikValidate";
import Link from "next/link";

export default function Account() {
  const router = useRouter();
  const formik = useFormik({
    initialValues: {
      email: "",
      password: ""
    },
    validate: loginValidate,
    validateOnChange: false,
    validateOnBlur: false,
    onSubmit,
  });

  const { data: session, status } = useSession();
  const [error, setError] = useState("");
  const [emailChanged, setEmailChanged] = useState(false);
  const [passChanged, setPassChanged] = useState(false);

  useEffect(() => {
    if (session && status !== "loading") {
      router.replace("/account/profile");
    }
  }, [session, router, status]);

  async function onSubmit(values) {
    // const result = await signIn("credentials", {
    //   email: "nahida@gmail.com",
    //   password: "12345",
    //   redirect: false,
    // });
    const result = await signIn("credentials", {
      email: values.email,
      password: values.password,
      redirect: false,
    });
    console.log("status = ", result);

  
    console.log("session = ", session);
    console.log("sessionStatus = ", status);
    if (result.ok) {
       window.location.replace("/");
    } else {
      setError(result.error);
    }

    console.log("status " + status);
  }
  
  return (
    <main className={styles.body}>
      {status === "loading" ? (
        <p>loading...</p>
      ) : !session ? (
        <div className={styles.formContainer}>
          <p className={styles.header}>Account</p> 
          <form className={styles.form} onSubmit={formik.handleSubmit}>
            <div className={styles.inputBox}>
              
            <input className={styles.input} type="text" name="email" {...formik.getFieldProps("email")} onFocus={() => {setEmailChanged(true)}} required/>
            <label className={styles.inputLabel}>Email</label>
            {formik.errors.email && !emailChanged ? <span className={styles.error}>{formik.errors.email}</span> : <div></div>}
            </div>
            <div className={styles.inputBox}>
            <input className={styles.input} type="password" name="password" {...formik.getFieldProps("password")} onFocus={() => {setPassChanged(true)}} required/>
            <label className={styles.inputLabel}>Password</label>
            {formik.errors.password && !passChanged ? <span className={styles.error}>{formik.errors.password}</span> : <div></div>}
            </div>
            <p className={styles.invalid}>{error}&nbsp;</p>
            <button className={styles.submit} type="submit" onClick={() => {setEmailChanged(false); setPassChanged(false); setError("");}}>Sign in</button>
            <div className={styles.register}>
              <p className={styles.register}>Wanna be in the leaderboard? <Link className={styles.registerLink} href="./account/register">Register</Link></p>
            </div>
          </form>
        </div>
      ) : null}
    </main>
  );
}
