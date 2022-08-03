import * as React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { registration } from "../api/http";
import { useState } from "react";
import "./authstyle.css";
import { defaultError, customError } from "../utilis/errors";
import { Shown, Hidden } from "../assets/passwordHide";

function SignUp() {
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isHidden, setIsHidden] = useState(true);

  let navigate = useNavigate();

  const handleChangeLogin = (e) => {
    setLogin(e.target.value);
  };

  const changeVisibility = (e) => {
    setIsHidden(!isHidden);
  };

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();

      if (confirmPassword !== password) {
        const error = new Error();
        error.response = {
          status: 403,
          data: {
            message: "Passwords don't match",
          }
        };
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

      const { message } = error.response.data
      const { status } = error.response
      
      switch (status) {
        case 400:
          customError(status, message);
          break;
        case 403:
          customError(status, message);
          break;
        case 422:
          customError(status, message);
          break;
        default:
          defaultError(status || 500);
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
            onChange={(e) => setPassword(e.target.value)}
            required
            placeholder="Create password"
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
        <div className="input_wrapper">
          <input
            onChange={(e)=> setConfirmPassword(e.target.value)}
            required
            placeholder="Confirm password"
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
