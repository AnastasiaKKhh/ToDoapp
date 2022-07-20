import React, { useState } from "react";
import styles from "./clearall_btnstyle.module.css";
import { ClearAllButtonIcon } from "../../assets/clearAllButtonIcon";
import axios from "axios";
import Swal from 'sweetalert2';

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
              Swal.fire({
                icon: 'error',
                title: 'Task not found',
                text: 'It seems like the task has been already deleted or doesn\'t exist',
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
