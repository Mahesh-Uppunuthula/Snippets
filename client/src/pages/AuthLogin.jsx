import React, { useEffect, useState } from "react";
import axios from "axios";
import Form from "../components/Form";
import Message from "../components/Message";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";

function AuthLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [_, setCookies] = useCookies(["access_token"]);

  const [finalResponse, setFinalResponse] = useState({});

  console.log(email, password);
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

  function loginUser(event) {
    event.preventDefault();
    axios
      .post("http://localhost:5000/login", { email, password })
      .then((response) => {
        const statusCode = response.data.status;
        if (statusCode === 401) {
          // show toast message saying username or password incorrect
          alert("username or password incorrect");
        } else {
          setCookies("access_token", response.data.token);
          window.localStorage.setItem("UserID", response.data.UserID);

          <Message
            message={"You are successfully logged in"}
            type={"notification"}
          />;
          console.log("axios login post req", response);

          setEmail("");
          setPassword("");

          navigate("/");
        }
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        console.log("usernma or password incorret");
        // <Message message={"Username or Password Incorrect"} type = {"error"} />
      });
  }

  return (
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
  );
}

export default AuthLogin;
