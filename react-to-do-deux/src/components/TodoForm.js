import React, { useState } from "react";
import { v4 as uuidv4 } from 'uuid';

// destructure the addTodo function
function TodoForm({ addTodo }) {
  const [todo, setTodo] = useState({
    id: '',
    task: '',
    completed: false
  });

  function handleTaskInputChange(e) {
    // take the old todo and update the state of its value
    setTodo({...todo, task: e.target.value});
  }

  function handleSubmit(e) {
    e.preventDefault();

    // if the value of the task with the extra space trimmed is truthy
    if(todo.task.trim()) {
      // call the addTodo function we passed as a prop from app.js
      // to give the todo a unique id with uuid
      addTodo({ ...todo, id: uuidv4() })
      // then reset the task property to an empty string
      setTodo({...todo, task: ''})
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <input
        name='task'
        className="todo-input"
        type='text'
        value={todo.task}
        onChange={handleTaskInputChange}
        />
      <button type='submit'>Create</button>
    </form>
  )
}

export default TodoForm;
