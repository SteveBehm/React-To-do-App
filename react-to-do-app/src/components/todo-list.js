import React, {useState} from "react";
import TodoForm from "./todo-form";
import Todo from "./todo";
import '../../src/App.css'

function TodoList() {
  // we will store all todos created in an array that we can use
  const [todos, setTodos] = useState([]);

  const addTodo = todo => {
    // this is used here to not allow a user to submit an empty todo
    if(!todo.text || /^\s*$/.test(todo.text)) {
      return
    }
    // here we use the spread operator to add the todo to the todos array
    // then we set the todos value to the newTodos array to update the list
    const newTodos = [todo, ...todos]
    setTodos(newTodos);
  }

  const updateTodo = (todoId, newValue) => {
    // this is used here to not allow a user to submit an empty todo
    if(!newValue.text || /^\s*$/.test(newValue.text)) {
      return
    }

    setTodos(prev => prev.map(item => (item.id === todoId ? newValue : item)))
  }

  /*
  in the removeTodo function we want to remove the todo after the user has click the X icon
  for that speicifc todo task
  we cqan filter through the todos array and have the removeArr only have the todos that have
  were not clicked on
  */
  const removeTodo = id => {
    const removeArr =[...todos].filter(todo => todo.id !== id)
    setTodos(removeArr);
  }

  const completeTodo = id => {
    let updatedTodos = todos.map(todo => {
      if (todo.id === id) {
        todo.isComplete = !todo.isComplete
      }
      return todo;
    })
    setTodos(updatedTodos);
  }

  return(
    <>
      <h1>What's the plan for today?</h1>
      <TodoForm onSubmit={addTodo} />
      <Todo todos={todos} completeTodo={completeTodo} removeTodo={removeTodo} updateTodo={updateTodo}/>
    </>
  )
}

export default TodoList;
