var React = require('react');
var TodoList = require('./TodoList');
var TodoStore = require('./TodoStore');
var TodoActions = require('./TodoActions');

var TodoApp = React.createClass({
  _getCurrentState: function() {
    return {
      items: TodoStore.getAll()
    };
  },
  _reload: function() {
    this.setState(this._getCurrentState());
  },
  getInitialState: function () {
    return this._getCurrentState();
  },
  componentDidMount: function() {
    TodoStore.addChangeListener(this._reload);
  },
  componentWillUnmount: function() {
    TodoStore.removeChangeListener(this._reload);
  },
  addTodoItem: function() {
    TodoActions.add();
  },
  removeTodoItem: function(item) {
    TodoActions.remove(item);
  },
  render: function() {
    return <div>
      <h3>Todo List App</h3>
      <button type="button" onClick={this.addTodoItem}>Add Item</button>
      <TodoList items={this.state.items} removeItem={this.removeTodoItem} />
    </div>
  }
});

module.exports = TodoApp;
