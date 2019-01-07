import React from 'react'
import { Link } from 'react-router'
import { connect } from 'react-redux'
import { deleteTodo } from './actions'

const TodoListItem = ({ todo, onDeleteTodo }) => {
  let content
  if(todo.deleting) {
    content = <span>Deleting...</span>
  } else {
    content = <span>(<Link to={`/${todo.id}`}>see</Link>)
    <button type="button" onClick={() =>
      onDeleteTodo(todo.id)
    } className="btn btn-default">Delete</button></span>
  }
  return <li>
    {todo.text} {content}
  </li>
}

const TodoList = ({ todoItems, onDeleteTodo }) => {
  return <ul>
    { todoItems.map(todo => <TodoListItem key={todo.id} todo={todo} onDeleteTodo={onDeleteTodo} />) }
  </ul>
}

export default connect(({todos}) => {
  return {
    loading: todos.loading,
    items: todos.items
  }
}, dispatch => {
  return {
    deleteTodo: (todoId) => {
      dispatch(deleteTodo(todoId))
    }
  }
})(({loading, items, deleteTodo}) => {
  let content
  if(loading) {
    content = <p>Loading...</p>
  } else {
    content = <TodoList todoItems={items} onDeleteTodo={deleteTodo} />
  }
  return <div>
    <h3>Todo List Page</h3>
    <Link to="/new">Create Todo</Link>
    {content}
  </div>
})
