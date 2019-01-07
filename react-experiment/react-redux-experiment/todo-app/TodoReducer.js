export default (state, action) => {
  const type = action.type
  switch(type) {
    case 'ADD_TODO':
      const newId = state.lastId
      return {
        lastId: newId + 1,
        todos: [
          ...state.todos,
          {
            id: newId,
            text: action.text
          }
        ]
      }
    case 'REMOVE_TODO':
      return {
        ...state,
        todos: state.todos.filter(t => t.id !== action.id)
      }
    default:
      return state
  }
}
