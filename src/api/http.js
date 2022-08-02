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

axiosInstance.interceptors.response.use((response) => {
  return response
}, async function (error) {
  const originalRequest = error.config;
  if (error.response.status === 401 && !originalRequest._retry) {
    originalRequest._retry = true;
    const { access } = await refreshAccessToken();
    axios.defaults.headers.common['Authorization'] = 'Bearer ' + access;
    return axiosInstance(originalRequest);
  }
  return Promise.reject(error);
});

const refreshAccessToken = async () => {
  const token = window.localStorage.getItem('refresh');
  const { data } = await axios.post(`${BASE_URL}/refresh`, {
    token,
  });
  window.localStorage.setItem('access', data.access)
  window.localStorage.setItem('refresh', data.refresh)

  return data;
}

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