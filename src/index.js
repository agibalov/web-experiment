import React from 'react'
import { render } from 'react-dom'
import { createStore } from 'redux'

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

const TodoApp = ({store}) => {
  const todos = store.getState().todos
  let textElement
  return <div>
    <input type="text" ref={(text) => {
      textElement = text
    }} />
    <button type="button" onClick={() => {
      store.dispatch(addTodo(textElement.value))
      textElement.value = ''
    }}>Add</button>
    <TodoList todos={todos} onRemoveTodo={(id) => {
      store.dispatch(removeTodo(id))
    }} />
  </div>
}

let lastId = 4
const store = createStore((state, action) => {
  const type = action.type
  switch(type) {
    case 'ADD_TODO':
      return {
        todos: [
          ...state.todos,
          {
            id: lastId++,
            text: action.text
          }
        ]
      }
    case 'REMOVE_TODO':
      return {
        todos: state.todos.filter(t => t.id !== action.id)
      }
    default:
      return state
  }
}, {
  todos: [{ id: 1, text: 'omg' }, { id: 2, text: 'wtf' }, { id: 3, text: 'bbq' }]
})

const doRender = () => {
  render(<TodoApp store={store} />, document.getElementById('root'))
}

store.subscribe(doRender)
doRender()
