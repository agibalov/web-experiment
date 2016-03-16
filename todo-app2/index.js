import React from 'react'
import { render } from 'react-dom'
import { Router, Route, IndexRoute, Link, hashHistory } from 'react-router'
import { connect } from 'react-redux'
import { push } from 'react-router-redux'

class TodoService {
  constructor() {
    this.lastId = 0
    this.todos = []
  }

  getTodos() {
    const todos = [...this.todos]
    return this.delayed(todos)
  }

  getTodo(id) {
    const todo = this.todos.filter(todo => todo.id == id)[0]
    return this.delayed(todo)
  }

  createTodo(text) {
    const id = this.createTodoSync(text)
    return this.delayed(id)
  }

  createTodoSync(text) {
    const id = ++this.lastId
    this.todos.push({
      id: id,
      text: text
    })
    return id
  }

  delayed(value) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(value)
      }, 1000)
    })
  }
}

const todoService = new TodoService()
todoService.createTodoSync('omg')
todoService.createTodoSync('wtf')
todoService.createTodoSync('bbq')

const todosLoadStarted = () => {
  return {
    type: 'TODOS_LOAD_STARTED'
  }
}

const todosLoadSucceeded = todos => {
  return {
    type: 'TODOS_LOAD_SUCCEEDED',
    todos: todos
  }
}

const todosLoadFailed = () => {
  return {
    type: 'TODOS_LOAD_FAILED'
  }
}

const todoLoadStarted = id => {
  return {
    type: 'TODO_LOAD_STARTED',
    id
  }
}

const todoLoadSucceeded = todo => {
  return {
    type: 'TODO_LOAD_SUCCEEDED',
    todo
  }
}

const todoLoadFailed = id => {
  return {
    type: 'TODO_LOAD_FAILED',
    id
  }
}

const todoCreateStarted = () => {
  return {
    type: 'TODO_CREATE_STARTED'
  }
}

const todoCreateSucceeded = id => {
  return {
    type: 'TODO_CREATE_SUCCEEDED',
    id
  }
}

const todoCreateFailed = () => {
  return {
    type: 'TODO_CREATE_FAILED'
  }
}

const loadTodos = () => {
  return dispatch => {
    dispatch(todosLoadStarted())
    todoService.getTodos().then(todos => {
      dispatch(todosLoadSucceeded(todos))
    }, () => {
      dispatch(todosLoadFailed())
    })
  }
}

const loadTodo = id => {
  return dispatch => {
    dispatch(todoLoadStarted(id))
    todoService.getTodo(id).then(todo => {
      dispatch(todoLoadSucceeded(todo))
    }, () => {
      dispatch(todoLoadFailed(id))
    })
  }
}

const createTodo = (text) => {
  return dispatch => {
    dispatch(todoCreateStarted())
    todoService.createTodo(text).then(id => {
      dispatch(todoCreateSucceeded(id))
      dispatch(push(`/${id}`))
    }, () => {
      dispatch(todoCreateFailed())
    })
  }
}

const App = ({children}) => {
  return <div>
    <h2>Todo App</h2>
    <Link to="/">Home</Link>
    {children}
    <hr />
    &copy; 2016
  </div>
}

const TodoListPage = connect(state => {
  return {
    loading: state.todos.loading,
    items: state.todos.items
  }
}, dispatch => {
  return {}
})(({loading, items}) => {
  let content
  if(loading) {
    content = <p>Loading...</p>
  } else {
    content = <ul>
      { items.map(todo => <li key={todo.id}>{todo.text} (<Link to={`/${todo.id}`}>see</Link>)</li>) }
    </ul>
  }
  return <div>
    <h3>Todo List Page</h3>
    <Link to="/new">Create Todo</Link>
    {content}
  </div>
})

const CreateTodoPage = connect(state => {
  return {
    working: state.todos.working
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

const TodoItemPage = connect((state) => {
  return {
    loading: state.todos.loading,
    item: state.todos.item
  }
}, dispatch => {
  return {}
})(({loading, item}) => {
  let content
  if(loading) {
    content = <p>Loading...</p>
  } else {
    content = <p>{item.text}</p>
  }
  return <div>
    <h3>Todo Item Page</h3>
    {content}
  </div>
})

import { createStore, combineReducers, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import { syncHistoryWithStore, routerReducer, routerMiddleware } from 'react-router-redux'

const reducers = combineReducers({
  // WTH do I need to initialize the state here?
  todos: (state = {}, action) => {
    switch(action.type) {
      case 'TODOS_LOAD_STARTED':
        return {
          loading: true
        }
      case 'TODOS_LOAD_SUCCEEDED':
        return {
          loading: false,
          items: [...action.todos]
        }
      case 'TODOS_LOAD_FAILED':
        return state

      case 'TODO_LOAD_STARTED':
        return {
          loading: true
        }
      case 'TODO_LOAD_SUCCEEDED':
        return {
          loading: false,
          item: action.todo
        }
      case 'TODO_LOAD_FAILED':
        return state

      case 'TODO_CREATE_STARTED':
        return {
          working: true
        }
      case 'TODO_CREATE_SUCCEEDED':
        return {
          working: false
        }
      case 'TODO_CREATE_FAILED':
        return state

      default:
        return state
    }
  },
  routing: routerReducer
})

import reduxThunkMiddleware from 'redux-thunk'
import reduxLoggerMiddleware from 'redux-logger'

const historyImpl = hashHistory

const store = createStore(
  reducers,
  applyMiddleware(
    routerMiddleware(historyImpl),
    reduxThunkMiddleware,
    reduxLoggerMiddleware()))

const history = syncHistoryWithStore(historyImpl, store)

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
