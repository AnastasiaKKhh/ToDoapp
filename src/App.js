import React, { useEffect, useState } from "react";
import "./index.css";
import TaskList from "./components/TaskList/TaskList";
import TaskInput from "./components/TaskInput/taskInput";
import { MAX_NOTES } from "./constants/todos";
import { getTasks } from "./api/http";
import { customError } from "./utilis/errors";
import AccountMenu from "./components/AccountMenu";

function App() {
  const [todo, setTodo] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [pagesAmount, setPagesAmount] = useState(0);
  const [tasksCount, setTasksCount] = useState(0);
  const [login, setLogin] = useState("");

 
  const fetchTodo = (activeFilter, isAscendingSort, currentPage) => {
    getTasks(activeFilter, isAscendingSort, currentPage)
      .then((response) => {
        setTodo(response.data.tasks);
        setTasksCount(response.data.count);
        setLogin(response.data.login);
      })
      .catch((error) => {
        customError(
          error.response.status,
          "Oops!",
          "There is a problem with getting task"
        );
      });
  };

  useEffect(() => {
    setPagesAmount(Math.ceil(tasksCount / MAX_NOTES) || 1);
  }, [tasksCount]);

  return (
    <div className="App">
      <div className="list_body">
        <div className="todo_header">
          <div className="account_container">
            <AccountMenu />
            <p className="user_name">Hello, {login}</p>
          </div>
        </div>

        <div className="list_body_content">
          <h1>ToDo</h1>
          <TaskInput
            tasksCount={tasksCount}
            setTasksCount={setTasksCount}
            todo={todo}
            setTodo={setTodo}
            setPagesAmount={setPagesAmount}
          />
          <TaskList
            tasksCount={tasksCount}
            setTasksCount={setTasksCount}
            todo={todo}
            setTodo={setTodo}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
            pagesAmount={pagesAmount}
            setPagesAmount={setPagesAmount}
            fetchTodo={fetchTodo}
          />
        </div>
      </div>
    </div>
  );
}

export default App;
