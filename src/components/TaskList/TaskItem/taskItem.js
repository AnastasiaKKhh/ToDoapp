import React, { useState } from "react";
import taskStyle from "./styles.module.css";
import { DeleteButtonIcon } from "../../../assets/deleteButtonIcon";
import { DoneIcon } from "../../../assets/doneIcon";

function TaskItem({ todo, setTodo, item, deleteTodo, changeTaskStatus, inputValue, setInputValue }) {
  const [edit, setEdit] = useState(false);
  const currentDate = new Date().getDate() + '/' + `${new Date().getMonth() + 1}` + '/' + new Date().getFullYear();


  const editTodo = (title) => {
    setEdit(true);
    setInputValue(title);
  }

  const closeOnBlur = () => {
    setEdit(false);
  };

  const saveTodo = (event, id) => {
    if (event.key === "Escape") {
      setEdit(false);
      return;
    } else {
      if (event.key !== "Enter") {
        return;
      }
      setTodo(
        todo.map((todoItem) => {
          if (todoItem.id === id) {
            const editedTask = {
              ...todoItem,
              title: inputValue
            };
            return editedTask;
          }
          return todoItem;
        })
      );
      setEdit(false);
    }
  }

  return (
    <li className={taskStyle.task_body}>
      <div className={taskStyle.right_side}>
        <button
          className={item.isDone ? `${taskStyle.done}` : `${taskStyle.donebtn}`}
          onClick={() => changeTaskStatus(item.id)}
        >
          <DoneIcon />
        </button>
        {edit ? (
          <div>
            <input
              autoFocus
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={(event) => saveTodo(event, item.id)}
              onBlur={closeOnBlur}
              value={inputValue}
              className={taskStyle.edit_mode_input}
            />
          </div>
        ) : (
          <p
            className={taskStyle.tasktxt}
            onClick={() => editTodo(item.title)}
          >
            {item.title}
          </p>
        )}
      </div>
      <div className={taskStyle.left_side}>
        <p className={taskStyle.date}>{currentDate}</p>
        <button
          className={taskStyle.delete_task}
          onClick={() => deleteTodo(item.id)}
        > <DeleteButtonIcon />
        </button>
      </div>
    </li>
  );
}

export default TaskItem;
