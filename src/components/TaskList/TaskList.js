import React, { useState, useEffect } from "react";
import TaskItem from "./TaskItem/taskItem";
import listStyle from "./styles.module.css";
import filterStyle from "./filterstyle.module.css";
import ClearAll from "../ClearAll/ClearAll";
import { ArrowUp } from "../../assets/arrows";
import { ArrowDown } from "../../assets/arrows";
import { LastPage } from "../../assets/pagesNavigationIcons";
import { FirstPage } from "../../assets/pagesNavigationIcons";
import PaginationButtons from "./Pagination/PaginationButtons";
import axios from "axios";
import Swal from "sweetalert2";

const TaskList = ({
  tasksCount,
  setTasksCount,
  todo,
  setTodo,
  currentPage,
  setCurrentPage,
  pagesAmount,

}) => {
  const filtersByState = {
    all: '',
    done: 'done',
    undone: 'undone',
  };

  const [inputValue, setInputValue] = useState("");
  const [activeFilter, setActiveFilter] = useState(filtersByState.all);
  const [isAscendingSort, setAscendingSort] = useState(true);

  const dateSort = () => {
    setAscendingSort(!isAscendingSort);
  };

  const changePage = (e) => {
    setCurrentPage(e.target.value);
  };

  const deleteTodo = (uuid) => {
    axios
      .delete(`https://todo-api-learning.herokuapp.com/v1/task/3/${uuid}`)
      .then(() => {
        const deletedTask = todo.filter((item) => item.uuid !== uuid);
        setTodo(deletedTask);
        setTasksCount(tasksCount - 1);
      })
      .catch((error) => {
        switch (error.response.status) {
          case 404:
            Swal.fire({
              icon: 'error',
              title: 'Task not found',
              text: 'It seems like the task has been already deleted or doesn\'t exist',
              footer: `Status code: ${error.response.status}`,
            })
            break;
            default:
              Swal.fire({
                icon: 'error',
                title: 'Oops!',
                text: 'Something went wrong!',
                footer: `Status code: ${error.response.status}`,
              })
        }
      })
  };

  const fetchData = async () => {

    const { data } = await axios.get(
      `https://todo-api-learning.herokuapp.com/v1/tasks/3?filterBy=${activeFilter}&order=${isAscendingSort ? "asc" : "desc"}&pp=5&page=${currentPage}`
    );
    setTodo(data.tasks);
    setTasksCount(data.count);
  };

  const changeTaskStatus = (uuid, done) => {
    axios
      .patch(`https://todo-api-learning.herokuapp.com/v1/task/3/${uuid}`, {
        done: !done,
      })
      .then(() => {
        setTodo(
          todo.filter((item) => {
            if (item.uuid === uuid) {
              item.done = !item.done;
            }
            return item;
          })
        );
        if (activeFilter === filtersByState.done) {
          fetchData();
        }
        if (activeFilter === filtersByState.undone) {
          fetchData();
        }
      })
      .catch((error) =>{
        Swal.fire({
          icon: 'error',
          title: 'Oops!',
          text: 'Something went wrong!',
          footer: `Status code: ${error.response.status}`,
        })
      })
  };

  const todoFilter = (status) => {
    setActiveFilter(status);
    if (status === filtersByState.all) {
      setTodo(todo);
    } else {
      let newTodo;
      if (status === filtersByState.done) {
        newTodo = todo.filter((item) => item.done);
        setTodo(newTodo);
      } else {
        newTodo = todo.filter((item) => !item.done);
        setTodo(newTodo);
      }
    }
  };

  const toTheFirstPage = () => {
    setCurrentPage(1);
  };

  const toTheLastPage = () => {
    setCurrentPage(pagesAmount);
  };

  useEffect(() => {
    setCurrentPage(1);
  }, [activeFilter]);

  useEffect(() => {
    if (currentPage <= pagesAmount) {
      setCurrentPage(currentPage);
    } else {
      setCurrentPage(currentPage - 1 || 1);
    }
  }, [pagesAmount]);

  useEffect(() => {
    fetchData();
    fetchData().catch((error) => {
      Swal.fire({
        icon: 'error',
        title: 'Oops!',
        text: 'Error receiving data from the server. Try again later! ',
        footer: `Status code: ${error.response.status}`,
      })
      });
  }, [currentPage, activeFilter, isAscendingSort, tasksCount]);

  return (
    <div>
      <div className={filterStyle.filters}>
        <button
          className={
            activeFilter === filtersByState.all
              ? `${filterStyle.filters_by_state} ${filterStyle.active_filter}`
              : `${filterStyle.filters_by_state}`
          }
          onClick={() => todoFilter(filtersByState.all)}
        >
          All
        </button>
        <button
          className={
            activeFilter === filtersByState.done
              ? `${filterStyle.filters_by_state} ${filterStyle.active_filter}`
              : `${filterStyle.filters_by_state}`
          }
          onClick={() => todoFilter(filtersByState.done)}
        >
          Done
        </button>
        <button
          className={
            activeFilter === filtersByState.undone
              ? `${filterStyle.filters_by_state} ${filterStyle.active_filter}`
              : `${filterStyle.filters_by_state}`
          }
          onClick={() => todoFilter(filtersByState.undone)}
        >
          Undone
        </button>
        <div className={filterStyle.filters_by_date}>
          <p>Sort by date</p>
          <div className={filterStyle.arrows}>
            <button className={filterStyle.arrows} onClick={dateSort}>
              {isAscendingSort ? (
                <ArrowUp arrowClass={filterStyle.arrow} />
              ) : (
                <ArrowDown arrowClass={filterStyle.arrow} />
              )}
            </button>
          </div>
        </div>
      </div>
      <ul className={listStyle.tasks}>
        {todo.map((item) => (
          <TaskItem
            key={item.uuid}
            todo={todo}
            setTodo={setTodo}
            item={item}
            deleteTodo={deleteTodo}
            changeTaskStatus={changeTaskStatus}
            inputValue={inputValue}
            setInputValue={setInputValue}
          />
        ))}
      </ul>
      <div className={listStyle.pagination}>
        <span onClick={toTheFirstPage}>
          <FirstPage buttonClass={listStyle.pageNav} />
        </span>
        <div className={listStyle.pages}>
          {new Array(pagesAmount).fill().map((_, i) => (
            <PaginationButtons
              i={i + 1}
              changePage={changePage}
              currentPage={currentPage}
              key={i}
            />
          ))}
        </div>
        <span onClick={toTheLastPage}>
          <LastPage buttonClass={listStyle.pageNav} />
        </span>
      </div>
      <ClearAll
        todo={todo}
        setTodo={setTodo}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
      />
    </div>
  );
};

export default TaskList;
