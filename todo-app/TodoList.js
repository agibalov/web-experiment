import React from 'react'
import TodoItem from './TodoItem'

const TodoList = ({todos, onRemoveTodo}) => {
  return <ul>
    { todos.map(todo => <TodoItem key={todo.id} id={todo.id} text={todo.text} onRemoveClicked={() => onRemoveTodo(todo.id)} />) }
  </ul>
}

export default TodoList
