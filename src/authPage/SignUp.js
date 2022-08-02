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
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isHidden, setIsHidden] = useState(true);

  let navigate = useNavigate();

  const handleChangeLogin = (e) => {
    setLogin(e.target.value);
  };
  const handleChangePassword = (e) => {
    setPassword(e.target.value);
  };
  const handleConfirmPassword = (e) => {
    setConfirmPassword(e.target.value);
  };
  const changeVisibility = (e) => {
    setIsHidden(!isHidden);
  };

  const error = new Error();
  error.response = {
    message: "Passwords don't match",
    status: 403,
  };

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();

      if (confirmPassword !== password) {
        throw error;
      }

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
          customError(error.response.status, error.response.data.message);
          break;
        case 403:
          customError(error.response.status, error.response.message);
          break;
        case 422:
          customError(error.response.status, error.response.data.message);
          break;
        default:
          defaultError(error.response.status || 500);
      }
    }
  };

  return (
    <div className="content">
      <h1>Welcome!</h1>
      <form onSubmit={handleSubmit}>
        <input
          onChange={handleChangeLogin}
          required
          placeholder="Create login"
          className="authInput login"
        />
        <div className="input_wrapper">
          <input
            onChange={handleChangePassword}
            required
            placeholder="Create password"
            className="authInput password"
            type={isHidden ? "password" : "text"}
          />
          {isHidden ?  (
            <svg
              className="show_pass"
              onClick={changeVisibility}
              width="25"
              height="25"
              viewBox="0 0 25 25"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M23.3471 12.1736C21.0068 7.84722 16.9027 5.22917 12.361 5.22917C7.81934 5.22917 3.70822 7.84722 1.38878 12.1736L1.19434 12.5L1.37489 12.8333C3.71517 17.1597 7.81934 19.7778 12.361 19.7778C16.9027 19.7778 21.0138 17.1944 23.3471 12.8333L23.5277 12.5L23.3471 12.1736ZM12.361 18.3542C8.45128 18.3542 4.861 16.1736 2.77767 12.5C4.861 8.82639 8.45128 6.64583 12.361 6.64583C16.2707 6.64583 19.8193 8.83333 21.9374 12.5C19.8193 16.1736 16.2638 18.3542 12.361 18.3542V18.3542Z"
                fill="#FF649C"
              />
              <path
                d="M12.5625 17.2847C15.1935 17.2847 17.3264 15.1519 17.3264 12.5208C17.3264 9.88981 15.1935 7.75694 12.5625 7.75694C9.93145 7.75694 7.79858 9.88981 7.79858 12.5208C7.79858 15.1519 9.93145 17.2847 12.5625 17.2847Z"
                fill="#FF649C"
              />
            </svg>
          ): (
            <svg
              className="show_pass"
              onClick={changeVisibility}
              width="25"
              height="25"
              viewBox="0 0 25 25"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M12.7569 7.75694C12.1949 7.7576 11.6375 7.85873 11.1111 8.05555L17.2222 14.1667C17.4216 13.6337 17.5228 13.069 17.5208 12.5C17.5153 11.2401 17.011 10.0338 16.1182 9.14488C15.2253 8.25598 14.0168 7.75693 12.7569 7.75694V7.75694Z"
                fill="#FF649C"
              />
              <path
                d="M23.8125 12.1736C21.4722 7.84722 17.3681 5.22916 12.8264 5.22916C11.5898 5.23207 10.3616 5.43131 9.1875 5.81944L10.3056 6.94444C11.1291 6.73162 11.9758 6.62198 12.8264 6.61805C16.7361 6.61805 20.2917 8.79861 22.4097 12.4722C21.6327 13.8351 20.6027 15.0372 19.375 16.0139L20.3611 17C21.782 15.8537 22.9621 14.4376 23.8333 12.8333L24.0139 12.5L23.8125 12.1736Z"
                fill="#FF649C"
              />
              <path
                d="M3.382 4.01389L6.47922 7.11111C4.52153 8.3716 2.92151 10.1151 1.83339 12.1736L1.65283 12.5L1.83339 12.8333C4.17367 17.1597 8.27783 19.7778 12.8195 19.7778C14.5922 19.7774 16.3418 19.3762 17.9376 18.6042L21.4098 22.0764L22.6251 21.0347L4.5695 2.97916L3.382 4.01389ZM9.14589 9.77777C8.49619 10.694 8.19167 11.8106 8.28625 12.9298C8.38082 14.0491 8.86839 15.0987 9.66263 15.893C10.4569 16.6872 11.5065 17.1748 12.6258 17.2694C13.745 17.3639 14.8616 17.0594 15.7778 16.4097L16.8889 17.5208C15.6027 18.0706 14.2183 18.3541 12.8195 18.3542C8.90978 18.3542 5.35422 16.1736 3.23617 12.5C4.25263 10.7001 5.71653 9.19319 7.48617 8.125L9.14589 9.77777Z"
                fill="#FF649C"
              />
            </svg>
          )}
        </div>
        <div className="input_wrapper">
          <input
            onChange={handleConfirmPassword}
            required
            placeholder="Confirm password"
            className="authInput password"
            type={isHidden ? "password" : "text"}
          />
          {isHidden ?  (
            <svg
              className="show_pass"
              onClick={changeVisibility}
              width="25"
              height="25"
              viewBox="0 0 25 25"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M23.3471 12.1736C21.0068 7.84722 16.9027 5.22917 12.361 5.22917C7.81934 5.22917 3.70822 7.84722 1.38878 12.1736L1.19434 12.5L1.37489 12.8333C3.71517 17.1597 7.81934 19.7778 12.361 19.7778C16.9027 19.7778 21.0138 17.1944 23.3471 12.8333L23.5277 12.5L23.3471 12.1736ZM12.361 18.3542C8.45128 18.3542 4.861 16.1736 2.77767 12.5C4.861 8.82639 8.45128 6.64583 12.361 6.64583C16.2707 6.64583 19.8193 8.83333 21.9374 12.5C19.8193 16.1736 16.2638 18.3542 12.361 18.3542V18.3542Z"
                fill="#FF649C"
              />
              <path
                d="M12.5625 17.2847C15.1935 17.2847 17.3264 15.1519 17.3264 12.5208C17.3264 9.88981 15.1935 7.75694 12.5625 7.75694C9.93145 7.75694 7.79858 9.88981 7.79858 12.5208C7.79858 15.1519 9.93145 17.2847 12.5625 17.2847Z"
                fill="#FF649C"
              />
            </svg>
          ): (
            <svg
              className="show_pass"
              onClick={changeVisibility}
              width="25"
              height="25"
              viewBox="0 0 25 25"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M12.7569 7.75694C12.1949 7.7576 11.6375 7.85873 11.1111 8.05555L17.2222 14.1667C17.4216 13.6337 17.5228 13.069 17.5208 12.5C17.5153 11.2401 17.011 10.0338 16.1182 9.14488C15.2253 8.25598 14.0168 7.75693 12.7569 7.75694V7.75694Z"
                fill="#FF649C"
              />
              <path
                d="M23.8125 12.1736C21.4722 7.84722 17.3681 5.22916 12.8264 5.22916C11.5898 5.23207 10.3616 5.43131 9.1875 5.81944L10.3056 6.94444C11.1291 6.73162 11.9758 6.62198 12.8264 6.61805C16.7361 6.61805 20.2917 8.79861 22.4097 12.4722C21.6327 13.8351 20.6027 15.0372 19.375 16.0139L20.3611 17C21.782 15.8537 22.9621 14.4376 23.8333 12.8333L24.0139 12.5L23.8125 12.1736Z"
                fill="#FF649C"
              />
              <path
                d="M3.382 4.01389L6.47922 7.11111C4.52153 8.3716 2.92151 10.1151 1.83339 12.1736L1.65283 12.5L1.83339 12.8333C4.17367 17.1597 8.27783 19.7778 12.8195 19.7778C14.5922 19.7774 16.3418 19.3762 17.9376 18.6042L21.4098 22.0764L22.6251 21.0347L4.5695 2.97916L3.382 4.01389ZM9.14589 9.77777C8.49619 10.694 8.19167 11.8106 8.28625 12.9298C8.38082 14.0491 8.86839 15.0987 9.66263 15.893C10.4569 16.6872 11.5065 17.1748 12.6258 17.2694C13.745 17.3639 14.8616 17.0594 15.7778 16.4097L16.8889 17.5208C15.6027 18.0706 14.2183 18.3541 12.8195 18.3542C8.90978 18.3542 5.35422 16.1736 3.23617 12.5C4.25263 10.7001 5.71653 9.19319 7.48617 8.125L9.14589 9.77777Z"
                fill="#FF649C"
              />
            </svg>
          )}
        </div>
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
