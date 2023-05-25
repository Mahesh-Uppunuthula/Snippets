import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Form from "../components/Form";

function AuthRegister() {
  const userRef = useRef();
  const [errMsg, setErrMsg] = useState("");

  const [email, setEmail] = useState("");
  const [isValidEmail, setValidEmail] = useState(false);
  const [isEmailFocused, setEmailFocused] = useState(false);

  const [password, setPassword] = useState("");
  const [isValidPassword, setValidPassword] = useState(false);
  const [isPasswordFocused, setPasswordFocused] = useState(false);

  const EMAIL_REGEX =
    /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
  const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;

  const navigate = useNavigate();

  /*
   *if user is already authenticated redirect user to home page
   */
  useEffect(() => {
    const token = window.localStorage.getItem("UserID");
    console.log(token);
    if (token) {
      navigate("/");
    }
  }, []);

  // VALIDATIONS

  useEffect(() => {
    // email validation
    const result = EMAIL_REGEX.test(email);
    setValidEmail(result);
  }, [email]);

  useEffect(() => {
    // password validation
    const result = PWD_REGEX.test(password);
    setValidPassword(result);
  }, [password]);

  function RegisterUser(event) {
    event.preventDefault();

    if (isValidEmail && isValidPassword) {
      axios
        .post("http://localhost:5000/register", { email, password })
        .then((response) => {
          const statusCode = response.data.status;

          if (statusCode === 409) {
            // pass a toast message here for conflict

            alert("user already exists");
          } else {
            console.log("axios login post req", response);
            navigate("/login");
            setEmail("");
            setPassword("");

            // pass a toast message here

            alert("registered succefully");
          }
        })
        .catch((err) => {
          console.log("err ", err);
          console.log("err response", err.response);
          if (!err?.response) {
            console.log("no server response");
          } else if (err.response?.status === 409) {
            console.log("username is taken");
          } else {
            console.log("registration failed");
          }
        });
    } else {
      // pass a toast message here

      alert("invalid password");
    }
  }

  return (
    <Form
      email={email}
      password={password}
      onEmailChange={(event) => {
        console.log(event.target.value);
        setEmail(event.target.value);
      }}
      onPasswordChange={(event) => {
        setPassword(event.target.value);
      }}
      label={"Sign Up"}
      handleSubmit={RegisterUser}
      isValidEmail={isValidEmail}
      isValidPassword={isValidPassword}
    />
  );
}

export default AuthRegister;
