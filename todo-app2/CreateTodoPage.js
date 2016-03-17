import React from 'react'
import { connect } from 'react-redux'
import { createTodo } from './actions'

const CreateTodoPage = connect(({createTodo}) => {
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
    content = <div>
      <input type="text" ref={e => textElement = e} />
      <button type="button" onClick={() => {
        createTodo(textElement.value)
      }}>Create</button>
    </div>
  }

  return <div>
    <h3>Create Todo Page</h3>
    {content}
  </div>
})

export default CreateTodoPage
