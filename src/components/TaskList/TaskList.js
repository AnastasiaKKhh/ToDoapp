import React, { useState, useEffect } from "react";
import TaskItem from "./TaskItem/taskItem";
import listStyle from "./styles.module.css";
import filterStyle from "./filterstyle.module.css";

import { ArrowUp } from "../../assets/arrows";
import { ArrowDown } from "../../assets/arrows";
import { LastPage } from "../../assets/pagesNavigationIcons";
import { FirstPage } from "../../assets/pagesNavigationIcons";
import PaginationButtons from "./Pagination/PaginationButtons";
import { deleteTask } from "../../api/http";
import { changeTaskProgress } from "../../api/http";
import { getTasks } from "../../api/http";
import { defaultError, customError } from "../../utilis/errors";
import { FILTERS_BY_STATE } from "../../constants/todos";

const TaskList = ({
  tasksCount,
  setTasksCount,
  todo,
  setTodo,
  currentPage,
  setCurrentPage,
  pagesAmount,
  setPagesAmount
}) => {

  const [inputValue, setInputValue] = useState("");
  const [activeFilter, setActiveFilter] = useState(FILTERS_BY_STATE.ALL);
  const [isAscendingSort, setIsAscendingSort] = useState(true);
  const [edit, setEdit] = useState(null);

  const editTodo = (value, id) => {
    setEdit(id);
    setInputValue(value);
  }
  const dateSort = () => {
    setIsAscendingSort(!isAscendingSort);
  };

  const changePage = (e) => {
    setCurrentPage(e.target.value);
  };

  const deleteTodo = (uuid) => {
    deleteTask(uuid)
      .then(() => {
        const deletedTask = todo.filter((item) => item.uuid !== uuid);
        setTodo(deletedTask);
        setTasksCount(tasksCount - 1);
      })
      .catch((error) => {
        switch (error.response.status) {
          case 404:
            customError(error.response.status, "Task not found", "It seems like the task has been already deleted or doesn't exist")
            break;
          default:
            defaultError(error.response.status)
        }
      })
  };

  // const fetchTodo = async (activeFilter, isAscendingSort, currentPage) => {
  //   const { data } = await getTasks(activeFilter, isAscendingSort, currentPage)
  //   console.log("FETCH TODO",data)
  //   setTodo(data.tasks);
  //   setTasksCount(data.count);
  // };

  const fetchTodo = (activeFilter, isAscendingSort, currentPage) => {
     getTasks(activeFilter, isAscendingSort, currentPage)
     .then((response)=> {

      setTodo(response.data.tasks);
      setTasksCount(response.data.count);

    }).catch((error) => {
      customError(error.response.status, "Oops!", "There is a problem with getting task")
    });
  };

  const changeTaskStatus = (uuid, done) => {
    changeTaskProgress (uuid,  done)
      .then(() => {
        const newTodo = todo.map((item) => {
          if (item.uuid === uuid) {
            const newItem = { ...item }
            newItem.done = !newItem.done;
            return newItem;
          }
          return item;
        })
        setTodo(newTodo);
        if (activeFilter !== FILTERS_BY_STATE.ALL) {
        fetchTodo(activeFilter, isAscendingSort, currentPage)
        }
      })
      .catch((error) => {
        defaultError(error.response.status)
      })
  };

  const todoFilter = (status) => {
    setActiveFilter(status);
    if (status === FILTERS_BY_STATE.ALL) {
      setTodo(todo);
    } else {
      let newTodo;
      if (status === FILTERS_BY_STATE.DONE) {
        newTodo = todo.filter((item) => item.done);
      } else {
        newTodo = todo.filter((item) => !item.done);
      }
      setTodo(newTodo);
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
    fetchTodo(activeFilter, isAscendingSort, currentPage)
  }, [currentPage, activeFilter, isAscendingSort, tasksCount]);

  return (
    <div>
      <div className={filterStyle.filters}>
        <button
          className={
            activeFilter === FILTERS_BY_STATE.ALL
              ? `${filterStyle.filters_by_state} ${filterStyle.active_filter}`
              : `${filterStyle.filters_by_state}`
          }
          onClick={() => todoFilter(FILTERS_BY_STATE.ALL)}
        >
          All
        </button>
        <button
          className={
            activeFilter === FILTERS_BY_STATE.DONE
              ? `${filterStyle.filters_by_state} ${filterStyle.active_filter}`
              : `${filterStyle.filters_by_state}`
          }
          onClick={() => todoFilter(FILTERS_BY_STATE.DONE)}
        >
          Done
        </button>
        <button
          className={
            activeFilter === FILTERS_BY_STATE.UNDONE
              ? `${filterStyle.filters_by_state} ${filterStyle.active_filter}`
              : `${filterStyle.filters_by_state}`
          }
          onClick={() => todoFilter(FILTERS_BY_STATE.UNDONE)}
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
            editTodo={(value) => editTodo(value, item.uuid)}
            setEdit={setEdit}
            edit={edit}
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
    </div>
  );
};

export default TaskList;
