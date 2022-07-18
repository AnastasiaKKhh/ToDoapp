import axios from "axios";
import {useState, useEffect} from 'react';

export function AxiosInstance({ todo, setTodo, currentPage, pagesAmount, setPagesAmount }) {
   useEffect(() => {
    axios
    .get(
      `https://todo-api-learning.herokuapp.com/v1/tasks/3?order=asc&pp=5&page=${currentPage}`
    )
    .then((response) => {
     setTodo(response.data.tasks);
     setPagesAmount(Math.ceil(response.data.count/5))
    })
  }, [currentPage]);
  // axios
  //   .get(
  //     "https://todo-api-learning.herokuapp.com/v1/tasks/3?order=asc&pp=5&page=1"
  //   )
  //   .then((response) => {
  //    setTodo(response.data.tasks);
  //    setPagesAmount(Math.ceil(response.data.count/5))
  //   })
}
