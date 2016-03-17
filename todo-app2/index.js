import React from 'react'
import { render } from 'react-dom'
import { Router, Route, IndexRoute, hashHistory } from 'react-router'

import App from './App'
import TodoListPage from './TodoListPage'
import CreateTodoPage from './CreateTodoPage'
import TodoItemPage from './TodoItemPage'

import { createStore, combineReducers, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import { syncHistoryWithStore, routerReducer, routerMiddleware } from 'react-router-redux'

import todoReducer from './todoReducer'
import todosReducer from './todosReducer'
import createTodoReducer from './createTodoReducer'

const reducers = combineReducers({
  todos: todosReducer,
  todo: todoReducer,
  createTodo: createTodoReducer,
  routing: routerReducer
})

import reduxThunkMiddleware from 'redux-thunk'
import reduxLoggerMiddleware from 'redux-logger'

const historyImpl = hashHistory

const diMiddleware = deps => store => next => action => {
  if(typeof action === 'function') {
    return next(action(deps))
  } else {
    return next(action)
  }
};

import TodoService from './TodoService'

const todoService = new TodoService()
todoService.createTodoSync('omg')
todoService.createTodoSync('wtf')
todoService.createTodoSync('bbq')

const store = createStore(
  reducers,
  applyMiddleware(
    routerMiddleware(historyImpl),
    diMiddleware({ todoService }),
    reduxThunkMiddleware,
    reduxLoggerMiddleware()))

const history = syncHistoryWithStore(historyImpl, store)

import { loadTodos } from './actions'
import { loadTodo } from './actions'

render(
  <Provider store={store}>
    <Router history={history}>
      <Route path="/" component={App}>
        <IndexRoute component={TodoListPage} onEnter={() => {
          store.dispatch(loadTodos())
        }} />
        <Route path="/new" component={CreateTodoPage} />
        <Route path="/:id" component={TodoItemPage} onEnter={nextState => {
          store.dispatch(loadTodo(nextState.params.id))
        }} />
      </Route>
    </Router>
  </Provider>,
  document.getElementById('root'))
