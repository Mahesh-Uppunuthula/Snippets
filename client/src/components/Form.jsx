import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";

function Form(props) {
  console.log("form ema", props.isValidEmail);
  console.log("form pass", props.isValidPassword);

  return (
    <div className="auth">
      <div className="auth-container">
        <form onSubmit={(event) => props.handleSubmit(event)}>
          <h1 auth-label>{props.label}</h1>
          <p className="motive-text">
            {props.label.toLowerCase() === "sign up"
              ? "Create your account "
              : "Now, log into your account"}
          </p>
          <div className="form-container">
            <label htmlFor="Email">Email</label>
            <input
              type="text"
              required
              autoComplete="off"
              placeholder="example@email.com"
              value={props.email}
              onChange={(event) => {
                props.onEmailChange(event);
              }}
              /*
               *apply validation styles while registration only
               */
              style={
                props.label.toLowerCase() === "sign up"
                  ? {
                      outlineWidth: "0px",
                      border: `2px  solid  ${
                        props.email !== ""
                          ? props.isValidEmail
                            ? "green"
                            : "red"
                          : "#00000050"
                      }`,
                    }
                  : {}
              }
            />

            <label htmlFor="Email">Password</label>
            <input
              type="password"
              required
              autoComplete="off"
              placeholder="min 8 characters long + 1 special & 1 capital alphabet"
              value={props.password}
              onChange={(event) => {
                props.onPasswordChange(event);
              }}
              /*
               *apply validation styles while registration only
               */
              style={
                props.label.toLowerCase() === "sign up"
                  ? {
                      outlineWidth: "0px",
                      border: `2px  solid  ${
                        props.password !== ""
                          ? props.isValidPassword
                            ? "green"
                            : "red"
                          : "#00000050"
                      }`,
                    }
                  : {}
              }
            />

            <button>{props.label}</button>

            <div className="helper-text">
              <p>
                {props.label.toLowerCase() === "sign up"
                  ? "Already a member?"
                  : "Not a member?"}
              </p>
              <Link
                className="authRedirectLink"
                to={
                  props.label.toLowerCase() === "sign up"
                    ? "/login"
                    : "/register"
                }
              >
                {props.label.toLowerCase() === "sign up"
                  ? "Sign In"
                  : "Sign Up"}
              </Link>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Form;
