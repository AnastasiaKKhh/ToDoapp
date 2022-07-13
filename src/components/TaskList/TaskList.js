import React, { useState, useEffect } from "react";
import TaskItem from "./TaskItem/taskItem";
import listStyle from "./styles.module.css";
import "./filterstyle.css";

const TaskList = ({ todo, setTodo }) => {
  const notesOnPage = 5;

  const [filtered, setFiltered] = useState(todo);
  const [filt, setFilt] = useState("all");

  const [currentPage, setCurrentPage] = useState(1);
  const lastTaskIndex = currentPage * notesOnPage;
  const firstTaskIndex = lastTaskIndex - notesOnPage;
  let currentTask;
  const [pagesAmount, setPagesAmount] = useState(countPages(todo));

  const [dateSorting, setDateSorting] = useState(false);

  reverseArr()

  const dateSort = () => {
    setDateSorting(!dateSorting);
    reverseArr()
  };

  function reverseArr() {
    if (dateSorting) {
      currentTask = [...filtered]
    } else {
      currentTask = [...filtered].reverse()
    }
    return currentTask

  }

  function countPages(todosArray) {
    return Math.ceil(todosArray.length / notesOnPage) || 1;
  }
  
  function changePage(e) {
    setCurrentPage(e.target.value);
  }

  function renderButtons(pagesAmount) {
    const content = [];
    for (let i = 1; i <= pagesAmount; i++) {
      content.push(
        <button onClick={changePage} key={i} value={i} className= {currentPage == i ? 'violet': 'common'}>
          {i}
        </button>
      );
    }

    return content;
  }

  function deleteTodo(id) {
    setTodo([...todo].filter((item) => item.id != id));
  }

  function statusTodo(id) {
    setTodo(
      [...todo].filter((item) => {
        if (item.id == id) {
          item.isDone = !item.isDone;
        }
        return item;
      })
    );
  }


  useEffect(() => {
    setFiltered(todo);
  }, [todo, currentPage]);

  useEffect(() => {
    {
      setPagesAmount(countPages(filtered));
    }
  }, [filt, filtered]);

  useEffect(() => {
    setFiltered(filtered);
  }, [filtered, currentPage, filt]);

  useEffect(() => {
    setCurrentPage (currentPage - 1 || 1);
  }, [pagesAmount]);

  useEffect(() => {
    switch (filt) {
      case true:
        setFiltered((todo.filter(item => item.isDone)))
     
        break;

      case false:
        setFiltered((todo.filter(item => !item.isDone)))
        break;

      default: setFiltered(todo);
        break;
    }
  }, [filt, todo]);

  const todoFilter = (status) => {
    setFilt(status);
    if (status == "all") {
      setFiltered(todo);
    } else {
      let newTodo = [...todo].filter((item) => item.isDone === status);
      setFiltered(newTodo);
    }
  };

  return (
    <div>
      <div className="filters">
        <button
          className={
            filt === "all"
              ? "filters_by_state active_filter"
              : "filters_by_state"
          }
          onClick={() => todoFilter("all")}
        >
          All
        </button>
        <button
          className={
            filt === true
              ? "filters_by_state active_filter"
              : "filters_by_state"
          }
          onClick={() => todoFilter(true)}
        >
          Done
        </button>
        <button
          className={
            filt === false
              ? "filters_by_state active_filter"
              : "filters_by_state"
          }
          onClick={() => todoFilter(false)}
        >
          Undone
        </button>
        <div className="filters_by_date">
          <p id="sortbydate">Sort by date</p>
          <div className="arrows">
            <button className="arrows" onClick={() => dateSort()}>
              {dateSorting ? (
                <svg
                  className="active_arrow arrow"
                  width="10"
                  height="13"
                  viewBox="0 0 10 13"
                  fill="black"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M10 8.14034L5.61403 12.5263L4.38596 12.5263L-6.32936e-07 8.14034L1.22807 6.89473L4.12281 9.77192L4.1228 -9.60619e-06L5.87719 -9.75956e-06L5.87719 9.77192L8.77193 6.87718L10 8.14034Z" />
                </svg>
              ) : (
                <svg className="arrow" width="10" height="13" viewBox="0 0 10 13" fill="black" xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M0 4.38596L4.38597 0H5.61404L10 4.38596L8.77193 5.63158L5.87719 2.75439V12.5263H4.12281V2.75439L1.22807 5.64912L0 4.38596Z" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>
      <ul className={listStyle.tasks}>

        {currentTask.slice(firstTaskIndex, lastTaskIndex).map((item) => (
          <TaskItem
            key={item.id}
            todo={todo}
            setTodo={setTodo}
            item={item}
            deleteTodo={deleteTodo}
            statusTodo={statusTodo}
          />
        ))}
      </ul>
      <div className="pagination">
        {renderButtons(pagesAmount)}
      </div>
    </div>
  );
};

export default TaskList;
