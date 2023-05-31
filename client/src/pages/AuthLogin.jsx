import React, { useEffect, useRef, useState } from "react";
import Axios from "axios";
import Form from "../components/Form";
import ToastMessage from "../components/ToastMessage/ToastMessage";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";

import helper from "../Services/helper";
const BASE_URL = helper.BASE_URL;

function AuthLogin() {
  const toastRef = useRef(null);

  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [_, setCookies] = useCookies(["access_token"]);

  const [toastState, setToastState] = useState({
    message: "",
    type: "",
  });

  /**
   * if user is already authenticated redirect user to home page
   */
  useEffect(() => {
    const token = window.localStorage.getItem("token");
    
    const url = BASE_URL + "/verify";
    if (token) {
      Axios
        .get(url, { headers: { Authorization: token } })
        .then((response) => {
          console.log("reponse from /verify router in auth login", response);
          if (!response.isVerified.data) {
            localStorage.clear();
            navigate("/");
          }
        })
    }
    console.log("toast state ", toastState);
  }, [toastState.message]);

  function loginUser(event) {
    event.preventDefault();
    
    const url = BASE_URL + "/login";
    Axios
      .post(url, { email, password })
      .then((response) => {
        const statusCode = response.data.status;
        if (statusCode === 401) {
          // show toast message saying Invalid Credentials

          setToastState(() => ({
            message: "Invalid Credentials",
            type: "error",
          }));
          toastRef.current.toast();
        } else {
          console.log("auth login response ", response);
          setCookies("access_token", response.data.token);
          window.localStorage.setItem("token", response.data.token);
          console.log("axios login post req", response);

          setEmail("");
          setPassword("");

          window.location.pathname = "/";
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }

  return (
    <>
      <ToastMessage
        message={toastState.message}
        type={toastState.type}
        ref={toastRef}
      />
      <Form
        email={email}
        password={password}
        onEmailChange={(event) => {
          setEmail(event.target.value);
        }}
        onPasswordChange={(event) => {
          setPassword(event.target.value);
        }}
        label={"Sign In"}
        handleSubmit={loginUser}
      />
    </>
  );
}

export default AuthLogin;
