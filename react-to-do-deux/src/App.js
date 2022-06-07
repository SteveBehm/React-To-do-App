import React, { useState, useEffect } from 'react';
import './App.css';
import TodoForm from './components/TodoForm';
import TodoList from './components/TodoList';

const LOCAL_STORAGE_KEY = 'react-to-do-deux-todos'

function App() {
  const [todos, setTodos] = useState([]);

  // set the page to our show our todos when the page is rendered
  useEffect(() => {
    const storageTodos = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY))
    if (storageTodos) {
      setTodos(storageTodos)
    }
  }, [])

  // store the todos in local storage so that they dont disappear on refresh
  // the second parameter tells the code to update local storage when todos
  // has changed its value
  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(todos))
  }, [todos])

  function addTodo(todo) {
    // add the new todo from the form submission the todos array
    // and spread the old todos out as well
    setTodos([todo, ...todos]);
  }

  function toggleComplete(id) {
    setTodos(
      todos.map(todo => {
        if(todo.id === id) {
          return {
            ...todo,
            completed: !todo.completed
          }
        }
        return todo
      })
    )
  }

  function removeTodo(id) {
    setTodos(todos.filter(todo => todo.id !== id))
  }

  return (
    <div className="App">
      <header className="App-header">
        <p>React Todo</p>
        <TodoForm addTodo={addTodo} />
        <TodoList
          todos={todos}
          toggleComplete={toggleComplete}
          removeTodo={removeTodo}
        />
      </header>
    </div>
  );
}

export default App;
