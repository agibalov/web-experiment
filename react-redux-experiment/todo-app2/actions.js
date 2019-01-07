export function todosLoadStarted() {
  return {
    type: 'TODOS_LOAD_STARTED'
  }
}

export function todosLoadSucceeded(todos) {
  return {
    type: 'TODOS_LOAD_SUCCEEDED',
    todos: todos
  }
}

export function todosLoadFailed() {
  return {
    type: 'TODOS_LOAD_FAILED'
  }
}

export function todoLoadStarted(id) {
  return {
    type: 'TODO_LOAD_STARTED',
    id
  }
}

export function todoLoadSucceeded(todo) {
  return {
    type: 'TODO_LOAD_SUCCEEDED',
    todo
  }
}

export function todoLoadFailed(id) {
  return {
    type: 'TODO_LOAD_FAILED',
    id
  }
}

export function todoCreateStarted() {
  return {
    type: 'TODO_CREATE_STARTED'
  }
}

export function todoCreateSucceeded(id) {
  return {
    type: 'TODO_CREATE_SUCCEEDED',
    id
  }
}

export function todoCreateFailed() {
  return {
    type: 'TODO_CREATE_FAILED'
  }
}

export function todoDeleteStarted(id) {
  return {
    type: 'TODO_DELETE_STARTED',
    id
  }
}

export function todoDeleteSucceeded(id) {
  return {
    type: 'TODO_DELETE_SUCCEEDED',
    id
  }
}

export function todoDeleteFailed(id) {
  return {
    type: 'TODO_DELETE_FAILED',
    id
  }
}

export function loadTodos() {
  return ({todoService}) => (dispatch) => {
    dispatch(todosLoadStarted())
    todoService.getTodos().then(todos => {
      dispatch(todosLoadSucceeded(todos))
    }, () => {
      dispatch(todosLoadFailed())
    })
  }
}

export function loadTodo(id) {
  return ({todoService}) => (dispatch) => {
    dispatch(todoLoadStarted(id))
    todoService.getTodo(id).then(todo => {
      dispatch(todoLoadSucceeded(todo))
    }, () => {
      dispatch(todoLoadFailed(id))
    })
  }
}

import { push } from 'react-router-redux'

export function createTodo(text) {
  return ({todoService}) => (dispatch) => {
    dispatch(todoCreateStarted())
    todoService.createTodo(text).then(id => {
      dispatch(todoCreateSucceeded(id))
      dispatch(push(`/${id}`))
    }, () => {
      dispatch(todoCreateFailed())
    })
  }
}

export function deleteTodo(todoId) {
  return ({todoService}) => (dispatch) => {
    dispatch(todoDeleteStarted(todoId))
    todoService.deleteTodo(todoId).then(() => {
      dispatch(todoDeleteSucceeded(todoId))
    }, () => {
      dispatch(todoDeleteFailed())
    })
  }
}
