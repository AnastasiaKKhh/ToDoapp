import React from "react";
import Swal from "sweetalert2";

export const defaultError = (statusCode) => {
    Swal.fire({
        icon: 'error',
        title: 'Oops!',
        text: 'Something went wrong!',
        footer: `Status code: ${statusCode}`,
      })
}

export const deleteError = (statusCode) => {
    Swal.fire({
        icon: 'error',
        title: 'Task not found',
        text: 'It seems like the task has been already deleted or doesn\'t exist',
        footer: `Status code: ${statusCode}`,
      })
}

export const gettingError = (statusCode) => {
    Swal.fire({
        icon: 'error',
        title: 'Oops!',
        text: 'Error receiving data from the server. Try again later! ',
        footer: `Status code: ${statusCode}`,
      })
}

export const invalidSymbolsError = (statusCode) => {
    Swal.fire({
        icon: 'error',
        title: 'Invalid symbols in the field',
        text: 'Try to rewrite your task',
        footer: `Status code: ${statusCode}`,
      })
}

export const taskNotUpdatedError = (statusCode) => {
    Swal.fire({
        icon: 'error',
        title: 'Task not updated!',
        text: 'Maybe the same task has been already exist',
        footer: `Status code: ${statusCode}`,
      })
}

export const changetaskStatusError = (statusCode) => {
    Swal.fire({
        icon: 'error',
        title: 'Task not updated!',
        text: 'Error receiving data from the server',
        footer: `Status code: ${statusCode}`,
      })
}

export const taskNotCreatedError = (statusCode) => {
    Swal.fire({
        icon: 'error',
        title: 'Task not created!',
        text: 'Maybe the same task has been already exist',
        footer: `Status code: ${statusCode}`,
      })
}