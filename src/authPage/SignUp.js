import * as React from "react";
import { Routes, Route, Link, NavLink, useNavigate } from "react-router-dom";
import ReactDOM from "react-dom/client";
import { registration } from "../api/http";
import { useState } from "react";
import "./authstyle.css";
import { defaultError, customError } from "../utilis/errors";
import Swal from "sweetalert2";

function SignUp() {
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
//   const [confirmPassword, setConfirmPassword] = useState("");

  let navigate = useNavigate();

  const handleChangeLogin = (e) => {
    setLogin(e.target.value);
  };
  const handleChangePassword = (e) => {
    setPassword(e.target.value);
  };
//   const handleConfirmPassword = (e) => {
//     setConfirmPassword(e.target.value);
//   };

  const handelSubmit = async (e) => {
    try {
    //   if (confirmPassword !== password) {
    //     throw newError()
    //     // Swal.fire({
    //     //     icon: "warning",
    //     //     title: "Passwords don't matches",
    //     //     text: "Check passwords",
    //     //   });
    //     //   return
    //   }
      e.preventDefault();
      const {
        data: { access, refresh },
      } = await registration({ login, password });
      window.localStorage.setItem("access", access);
      window.localStorage.setItem("refresh", refresh);

      navigate("/todos", { replace: true });
    } catch (error) {
      window.localStorage.clear();
      switch (error.response.status) {
        case 400:
          customError(error.response.status, "User with this name already exists")
          break;
        case 422:
          customError(error.response.status, "Invalid login or password")
          break;
        default:
          defaultError(error.response.status||500);
      }
    }
  };

  return (
    <div className="content">
      <h1>Welcome!</h1>
      <form onSubmit={handelSubmit}>
        <input
          onChange={handleChangeLogin}
          required
          placeholder="Create login"
          className="authInput login"
        />
        <input
          onChange={handleChangePassword}
          required
          placeholder="Create password"
          className="authInput password"
        />
        {/* <input
          onChange={handleConfirmPassword}
          required
          placeholder="confirm password"
          className="authInput password"
        /> */}
        <div className="btnwrapper">
          <button className="subBtn" type="submit">
            Create account
          </button>{" "}
        </div>
      </form>
      <p className="toSinUpPage">
        Already have an account?{" "}
        <span>
          <NavLink to="/login">Login</NavLink>
        </span>
      </p>
    </div>
  );
}

export default SignUp;
