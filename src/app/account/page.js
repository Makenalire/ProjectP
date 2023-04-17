"use client";

import { useFormik } from "formik";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { loginValidate } from "@/lib/formikValidate";

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
    setError("");
    const result = await signIn("credentials", {
      email: values.email,
      password: values.password,
      redirect: false,
    });
    console.log("status = ", result);

  
    console.log("session = ", session);
    console.log("sessionStatus = ", status);
    if (result.ok) {
       window.location.replace("/account/profile");
    } else {
      setError("Incorrect email or password.");
    }

    console.log("status " + status);
  }
  
  return (
    <div>
      {status === "loading" ? (
        <p>loading...</p>
      ) : !session ? (
        <div>
          <p>Account</p> 
          <form onSubmit={formik.handleSubmit}>
            <input type="text" name="email" placeholder="email@example.com" {...formik.getFieldProps("email")} onFocus={() => {setEmailChanged(true)}}/><br/>
            {formik.errors.email && !emailChanged ? <span>{formik.errors.email}</span> : <></>}<br/>
            <input type="password" name="password" placeholder="password" {...formik.getFieldProps("password")} onFocus={() => {setPassChanged(true)}}/><br/>
            {formik.errors.password && !passChanged ? <span>{formik.errors.password}</span> : <></>}<br/>
            <button type="submit" onClick={() => {setEmailChanged(false); setPassChanged(false);}}>Sign In</button>
          </form>
          <p>{error}</p>
        </div>
      ) : null}
    </div>
  );
}
