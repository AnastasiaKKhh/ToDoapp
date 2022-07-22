import React, { useState } from "react";
import styles from "./clearpage_btnstyle.module.css";
import { ClearPageButtonIcon } from "../../assets/clearPageButtonIcon";
import { deleteTask } from "../../api/http";
import { defaultError, deleteError } from "../../utilis/errors";

function ClearPage({ todo, setTodo, setCurrentPage, currentPage }) {
  const clearList = () => {
    const requests = todo.map((element) => deleteTask(element.uuid));
    Promise.all(requests)
      .then(() => {
        setTodo([]);
        setCurrentPage(currentPage - 1 || 1);
      })
      .catch((error) => {
        switch (error.response.status) {
          case 404:
            deleteError(error.response.status);
            break;
          default:
            defaultError(error.response.status)
        }
      });
  };
  return (
    <div>
      <button type="button" className={styles.cleanbtn} onClick={clearList}>
        Clear this page <ClearPageButtonIcon clsName={styles.cleanbtn_icon} />
      </button>
    </div>
  );
}

export default ClearPage;
