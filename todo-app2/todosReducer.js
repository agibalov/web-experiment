const todosReducer = (state = {}, action) => {
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
    default:
      return state
  }
}

export default todosReducer
