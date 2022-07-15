import React, { useState } from 'react';
import './index.css';
import TaskList from './components/TaskList/TaskList';
import TaskInput from './components/TaskInput/taskInput';
function App() {
  const [todo, setTodo] = useState([]);

  return (
    <div className="App">
      <div className="list_body">
        <div className="list_body_content">
          <h1>ToDo</h1>
          <TaskInput todo={todo} setTodo={setTodo} />
          <TaskList todo={todo} setTodo={setTodo} />
        </div>
      </div>
    </div>
  );
}

export default App;
