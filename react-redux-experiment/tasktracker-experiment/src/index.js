require('./style.less')

import React from 'react'
import { render } from 'react-dom'

import App from './App'

import appReducer from './appReducer'

import { createStore, combineReducers } from 'redux'
import { Provider } from 'react-redux'

const reducer = combineReducers({
  app: appReducer
})

const store = createStore(reducer)

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root'))
