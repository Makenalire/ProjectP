"use client";

import styles from "./register.module.css";
import { useFormik } from "formik";
import { useState } from "react";
import { registerValidate } from "@/lib/formikValidate";
import { useRouter } from "next/navigation";

export default function Account() {
  const router = useRouter();
  const formik = useFormik({
    initialValues: {
      username: "",
      email: "",
      password: "",
      confirm: "",
    },
    validate: registerValidate,
    validateOnChange: false,
    validateOnBlur: false,
    onSubmit,
  });

  const [error, setError] = useState("");
  const [emailChanged, setEmailChanged] = useState(false);
  const [nameChanged, setNameChanged] = useState(false);
  const [passChanged, setPassChanged] = useState(false);
  const [confirmChanged, setConfirmChanged] = useState(false);

  async function onSubmit(values) {
    let res = await fetch("http://localhost:3000/api/auth/signUp", {
      method: "POST",
      body: JSON.stringify({
        email: values.email,
        password: values.password,
        name: values.username,
      }),
      headers: {
        Accept: "application/json, text/plain",
        "Content-Type": "application/json",
      },
    });
    res = await res.json();
    
    if (res.success) {
      router.replace("../account");
    }
  }

  return (
    <main className={styles.body}>
      <div className={styles.formContainer}>
        <p className={styles.header}>Register</p>
        <form className={styles.form} onSubmit={formik.handleSubmit}>
          <div className={styles.inputBox}>
            <input
              className={styles.input}
              type="text"
              name="username"
              {...formik.getFieldProps("username")}
              onFocus={() => {
                setNameChanged(true);
              }}
              required
            />
            <label className={styles.inputLabel}>Username</label>
            {formik.errors.username && !nameChanged ? (
              <span className={styles.error}>{formik.errors.username}</span>
            ) : (
              <div></div>
            )}
          </div>
          <div className={styles.inputBox}>
            <input
              className={styles.input}
              type="text"
              name="email"
              {...formik.getFieldProps("email")}
              onFocus={() => {
                setEmailChanged(true);
              }}
              required
            />
            <label className={styles.inputLabel}>Email</label>
            {formik.errors.email && !emailChanged ? (
              <span className={styles.error}>{formik.errors.email}</span>
            ) : (
              <div></div>
            )}
          </div>
          <div className={styles.inputBox}>
            <input
              className={styles.input}
              type="password"
              name="password"
              {...formik.getFieldProps("password")}
              onFocus={() => {
                setPassChanged(true);
              }}
              required
            />
            <label className={styles.inputLabel}>Password</label>
            {formik.errors.password && !passChanged ? (
              <span className={styles.error}>{formik.errors.password}</span>
            ) : (
              <div></div>
            )}
          </div>
          <div className={styles.inputBox}>
            <input
              className={styles.input}
              type="password"
              name="confirm"
              {...formik.getFieldProps("confirm")}
              onFocus={() => {
                setConfirmChanged(true);
              }}
              required
            />
            <label className={styles.inputLabel}>Confirm Password</label>
            {formik.errors.confirm && !confirmChanged ? (
              <span className={styles.error}>{formik.errors.confirm}</span>
            ) : (
              <div></div>
            )}
          </div>
          <button
            className={styles.submit}
            type="submit"
            onClick={() => {
              setNameChanged(false);
              setEmailChanged(false);
              setPassChanged(false);
              setConfirmChanged(false);
              setError("");
            }}
          >
            Sign up
          </button>
        </form>
        <p>{error}</p>
      </div>
    </main>
  );
}
