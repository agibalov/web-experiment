import React from 'react'
import { connect } from 'react-redux'
import TodoList from './TodoList'
import { addTodo, removeTodo } from './TodoActions'

const TodoApp = ({ todos, onAddTodo, onRemoveTodo }, {store}) => {
  let textElement
  return <div>
    <input type="text" ref={(text) => {
      textElement = text
    }} />
    <button type="button" onClick={() => {
      onAddTodo(textElement.value)
      textElement.value = ''
    }}>Add</button>
    <TodoList todos={todos} onRemoveTodo={onRemoveTodo} />
  </div>
}
TodoApp.contextTypes = {
  store: React.PropTypes.object
}

// set TodoApp's 'data' properties from the store's state
const mapStateToPropos = (state) => {
  return {
    todos: state.todos
  }
}

// set TodoApp's 'behavior' properties explicitly using dispatch()
const mapDispatchToProps = (dispatch) => {
  return {
    onAddTodo: (text) => {
      dispatch(addTodo(text))
    },
    onRemoveTodo: (id) => {
      dispatch(removeTodo(id))
    }
  }
}

export default connect(mapStateToPropos, mapDispatchToProps)(TodoApp)
