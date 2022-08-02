import * as React from "react";
import { Routes, Route, Link, NavLink, useNavigate } from "react-router-dom";
import ReactDOM from "react-dom/client";
import { logIn } from "../api/http";
import { useState } from "react";
import "./authstyle.css";
import { defaultError, customError } from "../utilis/errors";
import { Shown, Hidden } from "../assets/passwordHide";

function Login() {
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const [isHidden, setIsHidden] = useState(true);

  let navigate = useNavigate();

  const handleChangeLogin = (e) => {
    setLogin(e.target.value);
  };
  const handleChangePassword = (e) => {
    setPassword(e.target.value);
  };
  const handelSubmit = async (e) => {
    try {
      e.preventDefault();
      const {
        data: { access, refresh },
      } = await logIn({ login, password });
      window.localStorage.setItem("access", access);
      window.localStorage.setItem("refresh", refresh);

      navigate("/todos", { replace: true });
    } catch (error) {
      window.localStorage.clear();

      const { message } = error.response.data;
      const { status } = error.response;

      switch (status) {
        case 400:
          customError(status, message);
          break;
        case 404:
          customError(status, message);
          break;
        default:
          defaultError(status || 500);
      }
    }
  };
  const changeVisibility = (e) => {
    setIsHidden(!isHidden);
  };

  return (
    <div className="content">
      <h1>Welcome!</h1>
      <form onSubmit={handelSubmit}>
        <input
          onChange={handleChangeLogin}
          required
          placeholder="login"
          className="authInput login"
        />
        <div className="input_wrapper">
          <input
            onChange={handleChangePassword}
            required
            placeholder="password"
            className="authInput password"
            type={isHidden ? "password" : "text"}
          />

          {isHidden ? (
            <div className="show_pass" onClick={changeVisibility}>
              <Shown />
            </div>
          ) : (
            <div className="show_pass" onClick={changeVisibility}>
              <Hidden />
            </div>
          )}
        </div>
        <div className="btnwrapper">
          <button className="subBtn" type="submit">
            Login
          </button>{" "}
        </div>
      </form>
      <p className="toSinUpPage">
        Don’t have an account?{" "}
        <span>
          <NavLink to="/reg">Sign up</NavLink>
        </span>
      </p>
    </div>
  );
}

export default Login;
