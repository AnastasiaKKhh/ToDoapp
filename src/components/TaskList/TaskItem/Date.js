import React from "react";
import taskStyle from "./styles.module.css"

export function Taskdate() {
  const day = new Date().getDate();
  const month = new Date().getMonth() + 1;
  const year = new Date().getFullYear();
  let currentDate = day + '/' + month + '/' + year;

  return (
    <p className={taskStyle.date}>{currentDate}</p>
  )

}


