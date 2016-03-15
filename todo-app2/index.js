import React from 'react'
import { render } from 'react-dom'
import { Router, Route, IndexRoute, Link, hashHistory } from 'react-router'
import { connect } from 'react-redux'

const createTodo = (text) => {
  return {
    type: 'CREATE_TODO',
    text: text
  }
}

const App = ({children}) => {
  return <div>
    <h2>Todo App</h2>
    {children}
    <hr />
    &copy; 2016
  </div>
}

const TodoListPage = connect(state => {
  return {
    todos: state.todos
  }
}, dispatch => {
  return {}
})(({todos}) => {
  return <div>
    <h3>Todo List Page</h3>
    <Link to="/new">Create Todo</Link>
    <ul>
      { todos.map(todo => <li key={todo.id}>{todo.text} (<Link to={`/${todo.id}`}>see</Link>)</li>) }
    </ul>
  </div>
})

const CreateTodoPage = connect(state => {
  return {}
}, dispatch => {
  return {
    createTodo: (text) => {
      console.log('create todo', text)
      dispatch(createTodo(text))
    }
  }
})(({createTodo}, {router}) => {
  let textElement
  return <div>
    <h3>Create Todo Page</h3>
    <input type="text" ref={e => textElement = e} />
    <button type="button" onClick={() => {
      createTodo(textElement.value)
      // how do I get the newly created todo id?
      // who should send the user to the new todo page?
    }}>Create</button>
  </div>
})

const TodoItemPage = connect((state, {params}) => {
  const id = parseInt(params.id)
  return {
    id: id,
    todo: state.todos.filter(todo => todo.id === id)[0]
  }
}, dispatch => {
  return {}
})(({id, todo}) => {
  return <div>
    <h3>Todo Item Page #{id}</h3>
    <p>{todo.text}</p>
  </div>
})

import { createStore } from 'redux'
import { Provider } from 'react-redux'

let lastId = 3
const store = createStore((state, action) => {
  switch(action.type) {
    case 'CREATE_TODO':
      const todo = {
        id: lastId++,
        text: action.text
      }
      return {
        todos: [
          ...state.todos,
          todo
        ]
      }
    default:
      return state
  }
}, {
  todos: [{id:1, text:'do something'}, {id:2, text:'do something else'}]
})

render(
  <Provider store={store}>
    <Router history={hashHistory}>
      <Route path="/" component={App}>
        <IndexRoute component={TodoListPage} />
        <Route path="/new" component={CreateTodoPage} />
        <Route path="/:id" component={TodoItemPage} />
      </Route>
    </Router>
  </Provider>,
  document.getElementById('root'))
