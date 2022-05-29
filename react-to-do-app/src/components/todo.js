import React, {useState} from "react";
import TodoForm from "./todo-form";
import {RiCloseCircleLine} from 'react-icons/ri';
import {TiEdit} from 'react-icons/ti';

function Todo({todos, completeTodo, removeTodo, updateTodo}) {
  const [edit, setEdit] = useState({
    id: null,
    value: ''
  })

  const submitUpdate = value => {
    updateTodo(edit.id, value)
    setEdit({
      id: null,
      value: ''
    })
  }

  if (edit.id) {
    return <TodoForm edit={edit} onSubmit={submitUpdate} />
  }

  /*
  we will map through the todos array to map out our todos
  we will pass the todo as well as the index as params
  each todo will be its own row and have text as well as two icons
  if the the todo's div is complete we will change its classnames in order to make it disappear
  the isComplete variable will be given a value on the TodoList component
  if the text is clicked we want to be able to mark it as completed
  we can set an onClick prop on the text div that will call the completeTodo function
  that is being passed into the Todo function as a prop from  the TodoList component
  */
  return todos.map((todo, index) => (
    <div className={todo.isComplete ? 'todo-row complete' : 'todo-row'} key={index}>
        <div key={todo.id} onClick={() => completeTodo(todo.id)}>
          {todo.text}
        </div>
        <div className="icons">
          <RiCloseCircleLine onClick={() => removeTodo(todo.id)} className='delete-icon'/>
          <TiEdit onClick={() => setEdit({id: todo.id, value: todo.text})} className='edit-icon'/>
        </div>
    </div>
  ))
}

export default Todo;
