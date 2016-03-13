import React from 'react'
import { render } from 'react-dom'
import { createStore } from 'redux'
import { Provider, connect } from 'react-redux'

const TodoItem = ({id, text, onRemoveClicked}) => {
  return <li>{text} (id={id}) <button type="button" onClick={onRemoveClicked}>X</button></li>
}

const TodoList = ({todos, onRemoveTodo}) => {
  return <ul>
    { todos.map(todo => <TodoItem key={todo.id} id={todo.id} text={todo.text} onRemoveClicked={() => onRemoveTodo(todo.id)} />) }
  </ul>
}

const addTodo = (text) => {
  return {
    type: 'ADD_TODO',
    text: text
  }
}

const removeTodo = (id) => {
  return {
    type: 'REMOVE_TODO',
    id: id
  }
}

let TodoApp = ({ todos, onAddTodo, onRemoveTodo }, {store}) => {
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

TodoApp = connect(mapStateToPropos, mapDispatchToProps)(TodoApp)

const store = createStore((state, action) => {
  const type = action.type
  switch(type) {
    case 'ADD_TODO':
      const newId = state.lastId
      return {
        lastId: newId + 1,
        todos: [
          ...state.todos,
          {
            id: newId,
            text: action.text
          }
        ]
      }
    case 'REMOVE_TODO':
      return {
        ...state,
        todos: state.todos.filter(t => t.id !== action.id)
      }
    default:
      return state
  }
}, {
  lastId: 10,
  todos: [{ id: 1, text: 'omg' }, { id: 2, text: 'wtf' }, { id: 3, text: 'bbq' }]
})

render(
  <Provider store={store}>
    <TodoApp />
  </Provider>,
  document.getElementById('root'))
