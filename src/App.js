import React, { useEffect, useState } from 'react';
import './index.css';
import TaskList from './components/TaskList/TaskList';
import TaskInput from './components/TaskInput/taskInput';

function App() {
  const MAX_NOTES = 5;
  const [todo, setTodo] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [pagesAmount, setPagesAmount] = useState();
  const [tasksCount, setTasksCount] = useState(0);

  useEffect(() => {
    setPagesAmount(Math.ceil(tasksCount / MAX_NOTES) || 1)
  }, [tasksCount])

  return (
    <div className="App">
      <div className="list_body">
        <div className="list_body_content">
          <h1>ToDo</h1>
          <TaskInput MAX_NOTES={MAX_NOTES} tasksCount={tasksCount} setTasksCount={setTasksCount} todo={todo} setTodo={setTodo} setPagesAmount={setPagesAmount} />
          <TaskList tasksCount={tasksCount} setTasksCount={setTasksCount} todo={todo} setTodo={setTodo} currentPage={currentPage} setCurrentPage={setCurrentPage} pagesAmount={pagesAmount} />
        </div>
      </div>
    </div>
  );
}

export default App;
