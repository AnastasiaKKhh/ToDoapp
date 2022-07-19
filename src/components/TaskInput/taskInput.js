import axios from "axios";
import React, { useState } from "react";
import styles from "./styles.module.css";

function TaskInput({ MAX_NOTES, todo, setTodo, tasksCount, setTasksCount }) {
  const [input, setInput] = useState("");
  const handleChange = (event) => setInput(event.target.value);
  const handleInputPress = (event) => {
    if (event.key === "Enter") {
      if (input) {
        if (tasksCount === 25) {
          alert("Task limit");
          return;
        }
        axios
          .post("https://todo-api-learning.herokuapp.com/v1/task/3", {
            name: input,
            done: false,
          })
          .then((res) => {
            const result = [...todo, res.data]
            if (result.length <= MAX_NOTES) {
              setTodo(result);
            }
            setTasksCount(tasksCount + 1)
          }).catch((e) =>console.log(e))
        setInput("");
      } else {
        alert("You can't add empty task");
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
