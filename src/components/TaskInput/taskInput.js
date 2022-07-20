import axios from "axios";
import React, { useState } from "react";
import styles from "./styles.module.css";
import Swal from "sweetalert2";

function TaskInput({ MAX_NOTES, todo, setTodo, tasksCount, setTasksCount }) {
  const [input, setInput] = useState("");
  const handleChange = (event) => setInput(event.target.value);
  const handleInputPress = (event) => {
    if (event.key === "Enter") {
      if (input) {
        if (tasksCount === 25) {
          Swal.fire({
            icon: 'error',
            title: 'That\'s a limit!',
            text: 'Delete old tasks to add new one',
          })
          return;
        }
        axios
          .post("https://todo-api-learning.herokuapp.com/v1/task/3", {
            name: input,
            done: false,
          })
          .then((res) => {
            const result = [...todo, res.data];
            if (result.length <= MAX_NOTES) {
              setTodo(result);
            }
            setTasksCount(tasksCount + 1);
          })
          .catch((error) => {
            switch (error.response.status) {
              case 400:
                Swal.fire({
                  icon: 'error',
                  title: 'Task not created!',
                  text: 'Maybe the same task has been already exist',
                  footer: `Status code: ${error.response.status}`,
                })
                break;
              case 422:
                Swal.fire({
                  icon: 'error',
                  title: 'Invalid symbols in the field',
                  text: 'Try to rewrite your task',
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
        setInput("");
      } else {
        Swal.fire({
          icon: 'error',
          title: 'You can\'t add an empty tasks',
        })
      }
    }
  };

  return (
    <div className={styles.create_new_task}>
      <input
        type="text"
        className={styles.task_input}
        placeholder="I want to..."
        value={input}
        onChange={handleChange}
        onKeyPress={handleInputPress}
      />
    </div>
  );
}

export default TaskInput;
