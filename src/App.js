import logo from './logo.svg';
import './App.css';
import React, { useState, useEffect } from 'react';

//Function for shaping the appearance of a task element
function Task({ task, index, markTask, removeTask }) {
  return (
      <div
          className="task"
          style={{ textDecoration: task.complete ? "line-through" : "" }} //Terinary operator for marking completed task
      >
          {task.title}

          <button style={{ background: "red" }} onClick={() => removeTask(index)}>Remove</button> 
          <button onClick={() => markTask(index)}>Complete</button>

      </div>
  );
}

//Function for creating the task
function CreateTask({ addTask }) { //addTask is a prop here
  const [value, setValue] = useState(""); //two elements with empty strings

  const handleSubmit = event => { //if no value, calls the addTask function with the input value
      event.preventDefault(); 
      if (!value) return;
      addTask(value);
      setValue("");
      //console.log(value);
  }
  return (
      <form onSubmit={handleSubmit}> {/* Calls on handleSubmit function */}
          <input
              type="text"
              className="input"
              value={value}
              placeholder="Add a new task"
              onChange={event => setValue(event.target.value)}
          />
      </form>
  );
}

//Main function
function App () {
  const [tasksRemaining, setTasksRemaining] = useState(0);
  const [tasks, setTasks] = useState([ //An array of objects with two elements
      {
          title: "Wash the dishes",
          complete: true
      },
      {
          title: "Walk the dog",
          complete: true
      },
      {
          title: "Make the bed",
          complete: false
      }
  ]);
    
  useEffect(() => { 
    setTasksRemaining(tasks.filter(task => !task.complete).length) 
  });

  const addTask = title => {
      const newTasks = [...tasks, { title, complete: false }];
      setTasks(newTasks);
  };
  
  const markTask = index => {
      const newTasks = [...tasks];
      newTasks[index].complete = true;
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
                  markTask={markTask}
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
