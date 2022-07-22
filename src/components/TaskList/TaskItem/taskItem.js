import React, { useEffect, useState } from "react";
import taskStyle from "./styles.module.css";
import { DeleteButtonIcon } from "../../../assets/deleteButtonIcon";
import { DoneIcon } from "../../../assets/doneIcon";
import { changeTask } from "../../../api/http";
import {
  defaultError,
  customError,
} from "../../../utilis/errors";

function TaskItem({
  edit,
  setEdit,
  editTodo,
  todo,
  setTodo,
  item,
  deleteTodo,
  changeTaskStatus,
  inputValue,
  setInputValue,
}) {
  const closeOnBlur = () => {
    setEdit(null);
  };

  const saveTodo = (event, uuid) => {
    if (event.key === "Escape") {
      setEdit(null);
      return;
    } else {
      if (event.key !== "Enter") {
        return;
      }
      changeTask(uuid, inputValue)
        .then(() => {
          setTodo(
            todo.map((todoItem) => {
              if (todoItem.uuid === uuid) {
                const editedTask = {
                  ...todoItem,
                  name: inputValue,
                };
                return editedTask;
              }
              return todoItem;
            })
          );
        })
        .catch((error) => {
          switch (error.response.status) {
            case 400:
              customError(error.response.status, "Task not updated!", "Maybe the same task has been already exist")
              break;
            case 422:
              customError(error.response.status, "Invalid symbols in the field", "Try to rewrite your task")
              break;
            default:
              defaultError(error.response.status);
          }
        });
      setEdit(null);
    }
  };

  return (
    <li className={taskStyle.task_body}>
      <div className={taskStyle.right_side}>
        <button
          className={item.done ? `${taskStyle.done}` : `${taskStyle.donebtn}`}
          onClick={() => changeTaskStatus(item.uuid, item.done)}
        >
          <DoneIcon />
        </button>
        {edit === item.uuid ? (
          <div>
            <input
              autoFocus
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={(event) => saveTodo(event, item.uuid)}
              onBlur={closeOnBlur}
              value={inputValue}
              className={taskStyle.edit_mode_input}
            />
          </div>
        ) : (
          <p className={taskStyle.tasktxt} onClick={() => editTodo(item.name)}>
            {item.name}
          </p>
        )}
      </div>
      <div className={taskStyle.left_side}>
        <p className={taskStyle.date}>
          {item.createdAt.split("").slice(0, 10).join("")}
        </p>
        <button
          className={taskStyle.delete_task}
          onClick={() => deleteTodo(item.uuid)}
        >
          <DeleteButtonIcon />
        </button>
      </div>
    </li>
  );
}

export default TaskItem;
