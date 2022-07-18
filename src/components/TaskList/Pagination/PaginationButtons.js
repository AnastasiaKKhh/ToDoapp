import React, { useState } from "react";
import btnStyle from '../../TaskList/styles.module.css'

function PaginationButtons({ i, changePage, currentPage }) {

  return (
    <button
      onClick={changePage}
      value={i}
      className={
        +currentPage === i ? `${btnStyle.violet}` : `${btnStyle.common}`
      }
    >
      {i}
    </button>
  );
}

export default PaginationButtons;

