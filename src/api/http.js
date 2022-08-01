import axios from "axios";

const BASE_URL = process.env.REACT_APP_BASE_URL;
const axiosInstance = axios.create({
  baseURL: BASE_URL,
});

export const postTask = (input) =>
  axiosInstance.post(`/todo`, {
    name: input,
  });

export const deleteTask = (uuid) => axiosInstance.delete(`/todo/${uuid}`);

export const changeTask = (uuid, newName) =>
  axiosInstance.patch(`/todo/${uuid}`, {
    name: newName,
  });

export const changeTaskProgress = (uuid, done) =>
  axiosInstance.patch(`/todo/${uuid}`, {
    done: !done,
  });

export const getTasks = (activeFilter, isAscendingSort, currentPage) =>
  axios.get(`${BASE_URL}/todos`, {
    params: {
      filterBy: activeFilter,
      order: isAscendingSort ? "asc" : "desc",
      pp: 5,
      page: currentPage,
    },
  })