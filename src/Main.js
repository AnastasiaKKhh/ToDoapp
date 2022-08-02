import ReactDOM from 'react-dom/client';
import { Routes, Route, Link, NavLink, Router, Navigate } from "react-router-dom";
import './index.css';
import App from './App';
import Login from './authPage/Login'
import {useEffect, useState} from "react"
import PrivateRoute from "./PrivateRoute";
import SignUp from './authPage/SignUp';

function Main() {
  const token = window.localStorage.getItem("access");

  return (
    <Routes >
      <Route exact path="/" element={token ? <Navigate to="/todos" /> :  <Login />} />
      <Route path="/login" element={token ? <Navigate to="/todos" /> : <Login />} />
      <Route path="/reg" element={token ? <Navigate to="/todos" /> : <SignUp />} />
      <Route path="/todos" element={
      <PrivateRoute 
      Component ={<App/>} />
      } />
    </Routes >
  )
}

export default Main