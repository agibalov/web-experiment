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

    case 'TODO_DELETE_STARTED':
      return {
        ...state,
        items: state.items.map(i => {
          if(i.id == action.id) {
            return {
              ...i,
              deleting: true
            }
          } else {
            return i
          }
        })
      }
    case 'TODO_DELETE_SUCCEEDED':
      return {
        ...state,
        items: state.items.filter(i => i.id != action.id)
      }
    case 'TODO_DELETE_FAILED':
      return state

    default:
      return state
  }
}

export default todosReducer
