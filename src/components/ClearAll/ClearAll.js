import React, { useState } from "react";
import styles from "./clearall_btnstyle.module.css";
import { ClearAllButtonIcon } from "../../assets/clearAllButtonIcon";
import axios from "axios";

function ClearAll({ todo, setTodo, setCurrentPage, currentPage }) {
  const clearList = () => {
    todo.forEach((element) => {
      axios
        .delete(
          `https://todo-api-learning.herokuapp.com/v1/task/3/${element.uuid}`
        )
        .then(() => {
          setTodo([]);
          setCurrentPage(currentPage - 1 || 1);
        })
        .catch((error) => {
          switch (error.response.status) {
            case 404:
              alert('Task not found. It seems like the task has been already deleted');	
              break;
              default:
                alert(`Oops! something went wrong! Status code: ${error.response.status}`)
          }
        })
    });
  };
  return (
    <div>
      <button type="button" className={styles.cleanbtn} onClick={clearList}>
        Clear this page <ClearAllButtonIcon clsName={styles.cleanbtn_icon} />
      </button>
    </div>
  );
}

export default ClearAll;
