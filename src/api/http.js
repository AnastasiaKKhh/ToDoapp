import axios from "axios";

const BASE_URL = process.env.REACT_APP_BASE_URL;
const axiosInstance = axios.create({
  baseURL: BASE_URL,
});
axiosInstance.interceptors.request.use(
  (req) => {
    req.headers.Authorization = `Bearer ${window.localStorage.getItem("access")}`;
    return req
  },
  (error) => {
    return Promise.reject(error);
  },
);
export const logIn = ({ login, password }) =>
  axios.post(`${BASE_URL}/login`, {
    login: login,
    password: password
  });

  export const registration = ({ login, password }) =>
  axios.post(`${BASE_URL}/reg`, {
    login: login,
    password: password
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

export const getTasks = async (activeFilter, isAscendingSort, currentPage) => {
  const response = await axiosInstance.get(`${BASE_URL}/todos`, {
    params: {
      filterBy: activeFilter,
      order: isAscendingSort ? "asc" : "desc",
      pp: 5,
      page: currentPage,
    },
  })
  return response;
}