import React, { useState } from "react";
import styles from "./styles.module.css";
import Swal from "sweetalert2";
import { MAX_NOTES } from "../../constants/todos";
import { postTask } from "../../api/http";
import { defaultError, invalidSymbolsError,taskNotCreatedError } from "../../utilis/errors";

function TaskInput({ todo, setTodo, tasksCount, setTasksCount }) {
  const [input, setInput] = useState("");

  const handleChange = (event) => setInput(event.target.value);
  
  const handleInputPress = (event) => {
    if (event.key === "Enter") {
      if (input) {
        if (tasksCount === 25) {
          Swal.fire({
            icon: 'warning',
            title: 'That\'s a limit!',
            text: 'Delete old tasks to add new one',
          })
          return;
        }
        postTask (input)
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
                taskNotCreatedError(error.response.status)
                break;
              case 422:
                invalidSymbolsError(error.response.status)
                break;
              default:
                defaultError(error.response.status)
            }
          })
        setInput("");
      } else {
        Swal.fire({
          icon: 'warning',
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
