export default (state = {}, action) => {
  switch(action.type) {
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
}
