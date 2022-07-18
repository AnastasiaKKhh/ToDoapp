import React, { useState } from "react";
import styles from "./clearall_btnstyle.module.css"
import { ClearAllButtonIcon } from "../../assets/clearAllButtonIcon";

function ClearAll({ setTodo, setCurrentPage }) {
  const clearList = () => {
    setTodo([]);
    setCurrentPage(1)
  };
  return (
    <div>
      <button
        type="button"
        className={styles.cleanbtn}
        onClick={clearList}
      >
        Clear list{" "}
        <ClearAllButtonIcon clsName={styles.cleanbtn_icon} />
      </button>
    </div>
  );
}

export default ClearAll;
