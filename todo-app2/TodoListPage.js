import React from 'react'
import { Link } from 'react-router'
import { connect } from 'react-redux'

const TodoListPage = connect(({todos}) => {
  return {
    loading: todos.loading,
    items: todos.items
  }
}, dispatch => {
  return {}
})(({loading, items}) => {
  let content
  if(loading) {
    content = <p>Loading...</p>
  } else {
    content = <ul>
      { items.map(todo => <li key={todo.id}>{todo.text} (<Link to={`/${todo.id}`}>see</Link>)</li>) }
    </ul>
  }
  return <div>
    <h3>Todo List Page</h3>
    <Link to="/new">Create Todo</Link>
    {content}
  </div>
})

export default TodoListPage
