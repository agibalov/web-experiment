const todosLoadStarted = () => {
  return {
    type: 'TODOS_LOAD_STARTED'
  }
}

export { todosLoadStarted }

const todosLoadSucceeded = todos => {
  return {
    type: 'TODOS_LOAD_SUCCEEDED',
    todos: todos
  }
}

export { todosLoadSucceeded }

const todosLoadFailed = () => {
  return {
    type: 'TODOS_LOAD_FAILED'
  }
}

export { todosLoadFailed }

const todoLoadStarted = id => {
  return {
    type: 'TODO_LOAD_STARTED',
    id
  }
}

export { todoLoadStarted }

const todoLoadSucceeded = todo => {
  return {
    type: 'TODO_LOAD_SUCCEEDED',
    todo
  }
}

export { todoLoadSucceeded }

const todoLoadFailed = id => {
  return {
    type: 'TODO_LOAD_FAILED',
    id
  }
}

export { todoLoadFailed }

const todoCreateStarted = () => {
  return {
    type: 'TODO_CREATE_STARTED'
  }
}

export { todoCreateStarted }

const todoCreateSucceeded = id => {
  return {
    type: 'TODO_CREATE_SUCCEEDED',
    id
  }
}

export { todoCreateSucceeded }

const todoCreateFailed = () => {
  return {
    type: 'TODO_CREATE_FAILED'
  }
}

export { todoCreateFailed }

const loadTodos = () => ({todoService}) => (dispatch) => {
  dispatch(todosLoadStarted())
  todoService.getTodos().then(todos => {
    dispatch(todosLoadSucceeded(todos))
  }, () => {
    dispatch(todosLoadFailed())
  })
}

export { loadTodos }

const loadTodo = id => ({todoService}) => (dispatch) => {
  dispatch(todoLoadStarted(id))
  todoService.getTodo(id).then(todo => {
    dispatch(todoLoadSucceeded(todo))
  }, () => {
    dispatch(todoLoadFailed(id))
  })
}

export { loadTodo }

import { push } from 'react-router-redux'

const createTodo = (text) => ({todoService}) => (dispatch) => {
  dispatch(todoCreateStarted())
  todoService.createTodo(text).then(id => {
    dispatch(todoCreateSucceeded(id))
    dispatch(push(`/${id}`))
  }, () => {
    dispatch(todoCreateFailed())
  })
}

export { createTodo }
