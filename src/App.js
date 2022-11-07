import logo from './logo.svg';
import './App.css';
import React, { useState, useEffect } from 'react';

//Function for shaping the appearance of a task element
function Task({ task, index, completeTask, removeTask }) {
  return (
      <div
          className="task"
          style={{ textDecoration: task.completed ? "line-through" : "" }}
      >
          {task.title}

          <button style={{ background: "red" }} onClick={() => removeTask(index)}>x</button>
          <button onClick={() => completeTask(index)}>Complete</button>

      </div>
  );
}

//Function for creating the task
function CreateTask({ addTask }) {
  const [value, setValue] = useState("");

  const handleSubmit = e => {
      e.preventDefault();
      if (!value) return;
      addTask(value);
      setValue("");
  }
  return (
      <form onSubmit={handleSubmit}>
          <input
              type="text"
              className="input"
              value={value}
              placeholder="Add a new task"
              onChange={e => setValue(e.target.value)}
          />
      </form>
  );
}

//Main function
function App () {
  const [tasksRemaining, setTasksRemaining] = useState(0);
  const [tasks, setTasks] = useState([
      {
          title: "Wash the dishes",
          completed: true
      },
      {
          title: "Walk the dog",
          completed: true
      },
      {
          title: "Make the bed",
          completed: false
      }
  ]);
    
  useEffect(() => { 
    setTasksRemaining(tasks.filter(task => !task.completed).length) 
  });

  const addTask = title => {
      const newTasks = [...tasks, { title, completed: false }];
      setTasks(newTasks);
  };
  
  const completeTask = index => {
      const newTasks = [...tasks];
      newTasks[index].completed = true;
      setTasks(newTasks);
  };
  
  const removeTask = index => {
      const newTasks = [...tasks];
      newTasks.splice(index, 1);
      setTasks(newTasks);
  };

  return (
      <div className="todo-container">
          <div className="header">Pending tasks ({tasksRemaining})</div>
          <div className="tasks">
              {tasks.map((task, index) => (
                  <Task
                  task={task}
                  index={index}
                  completeTask={completeTask}
                  removeTask={removeTask}
                  key={index}
                  />
              ))}
          </div>
          <div className="create-task" >
              <CreateTask addTask={addTask} />
          </div>
      </div>
  );
}

export default App;
