import axios from 'axios';
import React, { useState } from 'react';
import styles from "./styles.module.css"

function TaskInput({ todo, setTodo }) {

  const [input, setInput] = useState("");
  const handleChange = (event) => setInput(event.target.value);
  const handleInputPress = (event) => {
    if (event.key === "Enter") {
      if (input) {
        if (todo.length === 25) {
          alert("Task limit")
          return
        }
        axios.post("https://todo-api-learning.herokuapp.com/v1/task/3", {
          name: input,
          done: false,
        }).then (res => {
          console.log(res)
        })
        // setTodo([...todo, {
        //   id: new Date().getTime(),
        //   name: input,
        //   done: false,
        // }
        // ])
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