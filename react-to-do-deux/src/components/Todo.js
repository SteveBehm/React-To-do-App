import React from "react";

function Todo({ todo, toggleComplete, removeTodo }) {

  function handleCheckboxClick(e) {
    toggleComplete(todo.id)
  }

  function handleRemoveClick(e) {
    removeTodo(todo.id)
  }

  return (
    <>
      <input
        style={{ display: 'flex' }}
        type="checkbox"
        className="check"
        onClick={handleCheckboxClick}
        />
      <p
        stlye={{ color: 'white', textDecoration: todo.completed ? 'line-through' : null}}
        >
        {todo.task}
      </p>
      <button onClick={handleRemoveClick}>X</button>
    </>
  )
}

export default Todo;
