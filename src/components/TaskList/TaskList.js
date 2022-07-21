import React, { useState, useEffect } from "react";
import TaskItem from "./TaskItem/taskItem";
import listStyle from "./styles.module.css";
import filterStyle from "./filterstyle.module.css";
import ClearPage from "../ClearPage/ClearPage";
import { ArrowUp } from "../../assets/arrows";
import { ArrowDown } from "../../assets/arrows";
import { LastPage } from "../../assets/pagesNavigationIcons";
import { FirstPage } from "../../assets/pagesNavigationIcons";
import PaginationButtons from "./Pagination/PaginationButtons";
import { FILTERSBYSTATE } from "../../constants/todos";
import { deleteTask } from "../../api/http";
import { changeTaskProgress } from "../../api/http";
import { getTasks } from "../../api/http";
import { defaultError,deleteError,gettingError,changetaskStatusError } from "../../utilis/errors";

const TaskList = ({
  tasksCount,
  setTasksCount,
  todo,
  setTodo,
  currentPage,
  setCurrentPage,
  pagesAmount,
}) => {

  const [inputValue, setInputValue] = useState("");
  const [activeFilter, setActiveFilter] = useState(FILTERSBYSTATE.ALL);
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
            deleteError(error.response.status)
            break;
          default:
            defaultError(error.response.status)
        }
      })
  };

  const fetchTodo = async (activeFilter, isAscendingSort, currentPage) => {
    const { data } = await getTasks(activeFilter, isAscendingSort, currentPage)
    setTodo(data.tasks);
    setTasksCount(data.count);
  };

  const changeTaskStatus = (uuid, done) => {
    changeTaskProgress (uuid,  done)
      .then(() => {
        setTodo(
          todo.filter((item) => {
            const newItem = item;
            if (newItem.uuid === uuid) {
              newItem.done = !newItem.done;
            }
            return newItem;
          })
        );
        if (activeFilter !== FILTERSBYSTATE.ALL) {
          fetchTodo(activeFilter, isAscendingSort, currentPage)
          .catch((error)=> changetaskStatusError(error.response.status));
        }
      })
      .catch((error) => {
       defaultError(error.response.status)
      })
  };

  const todoFilter = (status) => {
    setActiveFilter(status);
    if (status === FILTERSBYSTATE.ALL) {
      setTodo(todo);
    } else {
      let newTodo;
      if (status === FILTERSBYSTATE.DONE) {
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
    .catch((error) => {
      gettingError(error.response.status)
    });
  }, [currentPage, activeFilter, isAscendingSort, tasksCount]);

  return (
    <div>
      <div className={filterStyle.filters}>
        <button
          className={
            activeFilter === FILTERSBYSTATE.ALL
              ? `${filterStyle.filters_by_state} ${filterStyle.active_filter}`
              : `${filterStyle.filters_by_state}`
          }
          onClick={() => todoFilter(FILTERSBYSTATE.ALL)}
        >
          All
        </button>
        <button
          className={
            activeFilter === FILTERSBYSTATE.DONE
              ? `${filterStyle.filters_by_state} ${filterStyle.active_filter}`
              : `${filterStyle.filters_by_state}`
          }
          onClick={() => todoFilter(FILTERSBYSTATE.DONE)}
        >
          Done
        </button>
        <button
          className={
            activeFilter === FILTERSBYSTATE.UNDONE
              ? `${filterStyle.filters_by_state} ${filterStyle.active_filter}`
              : `${filterStyle.filters_by_state}`
          }
          onClick={() => todoFilter(FILTERSBYSTATE.UNDONE)}
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
      <ClearPage
        todo={todo}
        setTodo={setTodo}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
      />
    </div>
  );
};

export default TaskList;
