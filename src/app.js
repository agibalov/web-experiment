var React = require('react');
var ReactDOM = require('react-dom');

// TodoItem
var TodoItem = React.createClass({
  removeItem: function() {
    this.props.onRemove(this.props.item);
  },
  render: function() {
    return <span>
      (id={this.props.item.id})
      {this.props.item.text}
      <button type="button" onClick={this.removeItem}>Remove</button>
    </span>;
  }
});
//

// TodoList
var TodoList = React.createClass({
  removeItem: function(item) {
    this.props.removeItem(item);
  },
  render: function() {
    var that = this;
    var itemNodes = this.props.items.map(function(item) {
      return <li><TodoItem item={item} onRemove={that.removeItem} /></li>
    });
    return <div>
      <p>Item count: {this.props.items.length}</p>
      <ul>
        {itemNodes}
      </ul>
    </div>
  }
});
//

// App
var App = React.createClass({
  _getCurrentState: function() {
    return {
      items: this.props.store.getAll()
    };
  },
  _reload: function() {
    this.setState(this._getCurrentState());
  },
  getInitialState: function () {
    return this._getCurrentState();
  },
  componentDidMount: function() {
    this.props.store.addListener(this._reload);
  },
  componentWillUnmount: function() {
    this.props.store.removeListener(this._reload);
  },
  addTodoItem: function() {
    this.props.dispatcher.addRandomItem();
  },
  removeTodoItem: function(item) {
    this.props.dispatcher.removeItem(item);
  },
  render: function() {
    return <div class="app">
      <h3>Todo List App</h3>
      <button type="button" onClick={this.addTodoItem}>Add Item</button>
      <TodoList items={this.state.items} removeItem={this.removeTodoItem} />
    </div>
  }
});
//

// TodoDispatcher
function TodoDispatcher(todoStore) {
  this.todoStore = todoStore;
};
TodoDispatcher.prototype.addRandomItem = function() {
  var id = Math.floor(Math.random() * 1000000000);
  this.todoStore.add({
    id: id,
    text: 'todo item ' + id
  });
};
TodoDispatcher.prototype.removeItem = function(item) {
  this.todoStore.remove(item);
};
//

// TodoStore
function TodoStore() {
  this._items = [];
  this._listeners = [];
};
TodoStore.prototype._notifyChanged = function() {
  for(var i = 0; i < this._listeners.length; ++i) {
    var listener = this._listeners[i];
    listener();
  }
};
TodoStore.prototype.getAll = function() {
  return this._items;
};
TodoStore.prototype.add = function(item) {
  this._items.push(item);
  this._notifyChanged();
};
TodoStore.prototype.remove = function(item) {
  var index = this._items.indexOf(item);
  if(index != -1) {
    this._items.splice(index, 1);
  }
  this._notifyChanged();
};
TodoStore.prototype.addListener = function(listener) {
  this._listeners.push(listener);
};
TodoStore.prototype.removeListener = function(listener) {
  var index = this._listeners.indexOf(listener);
  if(index != -1) {
    this._listeners.splice(index, 1);
  }
};
//

// Bootstrapper
var todoStore = new TodoStore();
var todoDispatcher = new TodoDispatcher(todoStore);

todoDispatcher.addRandomItem();
todoDispatcher.addRandomItem();
todoDispatcher.addRandomItem();

ReactDOM.render(
  <App store={todoStore} dispatcher={todoDispatcher} />,
  document.body
);
//
