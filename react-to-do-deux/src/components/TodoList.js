import React from "react";
import Todo from "./Todo";

function TodoList({ todos, toggleComplete, removeTodo }) {
  return (
    <ul>
      {todos.map(todo => (
        <li>
          <Todo
            key={todo.id} todo={todo}
            toggleComplete={toggleComplete}
            removeTodo={removeTodo}/>
        </li>
      ))}
    </ul>
  )
}

export default TodoList;
