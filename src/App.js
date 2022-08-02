import React, { useEffect, useState } from "react";
import "./index.css";
import { useNavigate } from "react-router-dom";
import TaskList from "./components/TaskList/TaskList";
import TaskInput from "./components/TaskInput/taskInput";
import { MAX_NOTES } from "./constants/todos";
import { LeaveArrow } from "./assets/arrows";

function App() {
  const [todo, setTodo] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [pagesAmount, setPagesAmount] = useState(0);
  const [tasksCount, setTasksCount] = useState(0);

  let navigate = useNavigate();

  const logOut = () => {
    window.localStorage.clear();

    navigate("/login", { replace: true });
  };

  useEffect(() => {
    setPagesAmount(Math.ceil(tasksCount / MAX_NOTES) || 1);
  }, [tasksCount]);

  return (
    <div className="App">
      <div className="list_body">
        <div className="exit_button_wrapper">
          <button className="exit" onClick={logOut}>
          Leave
          <LeaveArrow arrowClass = "leaveArrow"/>
        </button>
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
          />
        </div>
      </div>
    </div>
  );
}

export default App;
