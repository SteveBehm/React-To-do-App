import React, { useState, useEffect, useRef } from 'react';

function TodoForm(props) {
  const [input, setInput] = useState(props.edit ? props.edit.value : '')

  const inputRef = useRef(null);

  useEffect(() => {
    inputRef.current.focus();
  })

  const handleChange = e => {
    // this will allow the input text to change as a user types
    setInput(e.target.value)
  }

  const handleSubmit = e => {
    e.preventDefault();

    // pass props that can be used later in other components
    props.onSubmit({
      id: Math.floor(Math.random() * 10000),
      text: input
    })

    // this clears the input if you want to create a new todo
    setInput('');
  }
  return (
    <form className='todo-form' onSubmit={handleSubmit}>
      <input
      type='text'
      placeholder={props.edit ? 'Update' : 'Add a todo'}
      value={input}
      name='text'
      className={props.edit ? 'todo-input edit' : 'todo-input'}
      onChange={handleChange}
      ref={inputRef}
      />
      <button className={props.edit ? 'todo-btn edit' : 'todo-btn'}>{props.edit ? 'Update' : 'Create'}</button>
    </form>
  )
}

export default TodoForm;
