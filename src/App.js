import React, { useState } from 'react';
import './index.css';
import TaskList from './components/TaskList/TaskList';
import TaskInput from './components/TaskInput/taskInput';
import { AxiosInstance } from './api/http';


function App() {
  const [todo, setTodo] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [pagesAmount, setPagesAmount] = useState();

  return (
    <div className="App">
      <div className="list_body">
        <div className="list_body_content">
          <h1>ToDo</h1>
          <TaskInput todo={todo} setTodo={setTodo} />
          <TaskList todo={todo} setTodo={setTodo} currentPage={currentPage} setCurrentPage={setCurrentPage} pagesAmount={pagesAmount} setPagesAmount = {setPagesAmount}/>
          <AxiosInstance todo={todo} setTodo={setTodo} pagesAmount={pagesAmount} setPagesAmount = {setPagesAmount} currentPage={currentPage}/>
        </div>
      </div>
    </div>
  );
}

export default App;
