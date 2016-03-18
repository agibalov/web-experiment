import React from 'react'
import { connect } from 'react-redux'
import { createTodo } from './actions'

export default connect(({createTodo}) => {
  return {
    working: createTodo.working
  }
}, dispatch => {
  return {
    createTodo: (text) => {
      dispatch(createTodo(text))
    }
  }
})(({working, createTodo}) => {
  let content
  if(working) {
    content = <p>Working...</p>
  } else {
    let textElement
    content = <form onSubmit={(e) => {
      e.preventDefault()
      createTodo(textElement.value)
    }}>
      <input type="text" ref={e => textElement = e} />
      <button type="submit">Create</button>
    </form>
  }

  return <div>
    <h3>Create Todo Page</h3>
    {content}
  </div>
})
