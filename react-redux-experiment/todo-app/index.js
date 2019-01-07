import React from 'react'
import { render } from 'react-dom'
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import TodoApp from './TodoApp'
import reduce from './TodoReducer'

const store = createStore(reduce, {
  lastId: 10,
  todos: [{ id: 1, text: 'omg' }, { id: 2, text: 'wtf' }, { id: 3, text: 'bbq' }]
})

render(
  <Provider store={store}>
    <TodoApp />
  </Provider>,
  document.getElementById('root'))
