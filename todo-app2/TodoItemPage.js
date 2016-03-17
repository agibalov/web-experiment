import React from 'react'
import { connect } from 'react-redux'

const TodoItemPage = connect(({todo}) => {
  return {
    loading: todo.loading,
    item: todo.item
  }
}, dispatch => {
  return {}
})(({loading, item}) => {
  let content
  if(loading) {
    content = <p>Loading...</p>
  } else {
    content = <p>{item.text}</p>
  }
  return <div>
    <h3>Todo Item Page</h3>
    {content}
  </div>
})

export default TodoItemPage
