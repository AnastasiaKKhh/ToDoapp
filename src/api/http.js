import axios from "axios";

const BASE_URL = process.env.REACT_APP_BASE_URL;
const axiosInstance = axios.create({
  baseURL: BASE_URL,
});

export const postTask = (input) =>
  axiosInstance.post(`/task/3`, {
    name: input,
  });

export const deleteTask = (uuid) => axiosInstance.delete(`/task/3/${uuid}`);

export const changeTask = (uuid, newName) =>
  axiosInstance.patch(`/task/3/${uuid}`, {
    name: newName,
  });

export const changeTaskProgress = (uuid, done) =>
  axiosInstance.patch(`/task/3/${uuid}`, {
    done: !done,
  });

export const getTasks = (activeFilter, isAscendingSort, currentPage) =>
  axiosInstance.get(`/tasks/3`, {
    params: { 
        filterBy: activeFilter, 
        order: isAscendingSort ? "asc" : "desc", 
        pp: 5, 
        page: currentPage },
  });
