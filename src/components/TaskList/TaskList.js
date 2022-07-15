import React, { useState, useEffect } from "react";
import TaskItem from "./TaskItem/taskItem";
import listStyle from "./styles.module.css";
import filterStyle from "./filterstyle.module.css";
import ClearAll from "../ClearAll/ClearAll"
import { ArrowUp } from "../../assets/arrows";
import { ArrowDown } from "../../assets/arrows";
import { LastPage } from "../../assets/pagesNavigationIcons";
import { FirstPage } from "../../assets/pagesNavigationIcons";
import PaginationButtons from "./Pagination/PaginationButtons";

const TaskList = ({ todo, setTodo }) => {
  const MAX_NOTES = 5;

  const filtersByState = {
    all: 10,
    done: 1,
    undone: 0,
  }

  const countPages = (todosArray) => Math.ceil(todosArray.length / MAX_NOTES) || 1;
  const [inputValue, setInputValue] = useState('');

  const [filtered, setFiltered] = useState([]);
  const [activeFilter, setActiveFilter] = useState(filtersByState.all);

  const [currentPage, setCurrentPage] = useState(1);
  const lastTaskIndex = currentPage * MAX_NOTES;
  const firstTaskIndex = lastTaskIndex - MAX_NOTES;
  const [pagesAmount, setPagesAmount] = useState(countPages(todo));
  const [isAscendingSort, setAscendingSort] = useState(false);
  let shownTasks = [...filtered];

  const reverseArr = () => {
    if (!isAscendingSort) {
      shownTasks = [...filtered].reverse();
    }
    return shownTasks;
  };

  reverseArr();

  const dateSort = () => {
    setAscendingSort(!isAscendingSort);
    reverseArr();
  };

  const changePage = (e) => {
    setCurrentPage(e.target.value);
  };

  const deleteTodo = (id) => {
    const deletedTask = todo.filter((item) => item.id !== id);
    setTodo(deletedTask);
  };

  const changeTaskStatus = (id) => {
    setTodo(
      todo.filter((item) => {
        if (item.id === id) {
          item.isDone = !item.isDone;
        }
        return item;
      })
    );
  };

  const todoFilter = (status) => {
    setActiveFilter(status);
    if (status === filtersByState.all) {
      setFiltered(todo);
    } else {
      let newTodo;
      if (status === filtersByState.done) {
        newTodo = todo.filter((item) => item.isDone)
        setFiltered(newTodo)
      } else {
        newTodo = todo.filter((item) => !item.isDone);
        setFiltered(newTodo);
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
    setFiltered(todo);
  }, [todo, currentPage]);

  useEffect(() => {
    setPagesAmount(countPages(filtered));
  }, [activeFilter, filtered]);

  useEffect(() => {
    setFiltered(filtered);
  }, [filtered, currentPage, activeFilter]);

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
    switch (activeFilter) {
      case filtersByState.done:
        setFiltered(todo.filter((item) => item.isDone));

        break;

      case filtersByState.undone:
        setFiltered(todo.filter((item) => !item.isDone));
        break;

      default:
        setFiltered(todo);
        break;
    }
  }, [activeFilter, todo]);

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
              {isAscendingSort ? <ArrowUp arrowClass={filterStyle.arrow} /> : <ArrowDown arrowClass={filterStyle.arrow} />
              }
            </button>
          </div>
        </div>
      </div>
      <ul className={listStyle.tasks}>
        {shownTasks.slice(firstTaskIndex, lastTaskIndex).map((item) => (
          <TaskItem
            key={item.id}
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
          {
            new Array(pagesAmount).fill().map((element, i) => (
              <PaginationButtons
                i={i + 1}
                changePage={changePage}
                currentPage={currentPage}
              />
            ))
          }
        </div>
        <span onClick={toTheLastPage}>
          <LastPage buttonClass={listStyle.pageNav} />
        </span>
      </div>
      <ClearAll todo={todo} setTodo={setTodo} currentPage={currentPage} setCurrentPage={setCurrentPage} />
    </div>
  );
};

export default TaskList;
