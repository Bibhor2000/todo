import logo from './logo.svg';
import './App.css';
import React, { useState, useEffect } from 'react';

//Function for shaping the appearance of a task element
function Task({ task, indexPosition, markTask, removeTask }) {
  return (
      <div
          className="task"
          style={{ textDecoration: task.complete ? "line-through" : "" }} //Terinary operator for marking completed task
      >
          {task.title}

          <button style={{ background: "red" }} onClick={() => removeTask(indexPosition)}>Remove</button> 
          <button onClick={() => markTask(indexPosition)}>Complete</button>

      </div>
  );
}

//Function for creating the task
function Create({ addTask }) { //addTask is a prop here
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
          /> {/* event is passed in to access the value of a changed element */}
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
  
  const markTask = indexPosition => {
      const newTasks = [...tasks];
      newTasks[indexPosition].complete = true;
      setTasks(newTasks);
  };
  
  const removeTask = indexPosition => {
      const newTasks = [...tasks];
      newTasks.splice(indexPosition, 1);
      setTasks(newTasks);
  };

  return (
      <div className="todo-container">
          <div className="header">Pending tasks ({tasksRemaining})</div>
          <div className="tasks">
              {tasks.map((task, indexPosition) => (
                  <Task
                  task={task}
                  indexPosition={indexPosition}
                  markTask={markTask} 
                  removeTask={removeTask}
                  key={indexPosition}
                  /> 
              ))} {/*Passed down from line 6 as props to call the respective functions*/}
          </div>
          <div className="create-task" >
              <Create addTask={addTask} />
          </div> {/*Passed down from line 22 as props to call the addTask function*/}
      </div>
  );
}

export default App;
