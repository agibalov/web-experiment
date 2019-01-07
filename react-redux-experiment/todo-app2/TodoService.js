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

  deleteTodo(id) {
    this.todos = this.todos.filter(todo => todo.id != id)
    return this.delayed()
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

export default TodoService
