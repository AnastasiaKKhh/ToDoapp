import React from "react";
import Swal from "sweetalert2";

export const defaultError = (statusCode) => {
  Swal.fire({
    icon: "error",
    title: "Oops!",
    text: "Something went wrong!",
    footer: `Status code: ${statusCode}`,
  });
};

export const customError = (statusCode, textTitle,message ) => {
  Swal.fire({
    icon: "error",
    title: textTitle,
    text: message,
    footer: `Status code: ${statusCode}`,
  });
}