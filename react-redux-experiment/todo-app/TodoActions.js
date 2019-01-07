const addTodo = (text) => {
  return {
    type: 'ADD_TODO',
    text: text
  }
}

const removeTodo = (id) => {
  return {
    type: 'REMOVE_TODO',
    id: id
  }
}

export {
  addTodo,
  removeTodo
}
