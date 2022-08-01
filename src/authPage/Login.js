import * as React from "react";
import { Routes, Route, Link, NavLink, useNavigate } from "react-router-dom";
import ReactDOM from "react-dom/client";
import { logIn } from "../api/http";
import { useState } from "react";
import "./authstyle.css";
// import {AccountIcon} from "../assets/accountIcon"

function Login() {
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");

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
    } catch {
      window.localStorage.clear();
    }
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
        <input
          onChange={handleChangePassword}
          required
          placeholder="password"
          className="authInput password"
        />
        <div className="btnwrapper">
          <button className = "subBtn" type="submit">Login</button>{" "}
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
