import React, { useState } from 'react';
import styles from "./styles.module.css"

function TaskInput({ todo, setTodo }) {

  const [input, setInput] = useState("");
  const handleChange = (event) => setInput(event.target.value);
  const handleInputPress = (event) => {
    if (event.key === "Enter") {
      if (input !== "") {
        if (todo.length === 25) {
          alert("Task limit")
          return
        }
        setTodo(([...todo, {
          id: new Date().getTime(),
          title: input,
          isDone: false,
        }
        ]))
        setInput("");
      } else {
        alert('You can\'t add empty task')
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
  )

}

export default TaskInput