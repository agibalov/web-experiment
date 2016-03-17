const todoReducer = (state = {}, action) => {
  switch(action.type) {
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
    default:
      return state
  }
}

export default todoReducer
