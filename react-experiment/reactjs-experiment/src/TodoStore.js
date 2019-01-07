var AppDispatcher = require('./AppDispatcher');
var EventEmitter = require('events').EventEmitter;
var assign = require('object-assign');

var _todos = [];

function add() {
  var id = Math.floor(Math.random() * 1000000000);
  _todos.push({
    id: id,
    text: 'todo item ' + id
  });
};

function remove(todo) {
  var index = _todos.indexOf(todo);
  if(index != -1) {
    _todos.splice(index, 1);
  };
};

var TodoStore = assign({}, EventEmitter.prototype, {
  getAll: function() {
    return _todos;
  },

  emitChange: function() {
    this.emit('change');
  },

  addChangeListener: function(callback) {
    this.on('change', callback);
  },

  removeChangeListener: function(callback) {
    this.removeListener('change', callback);
  }
});

AppDispatcher.register(function(action) {
  if(action.actionType === 'add') {
    add();
    TodoStore.emitChange();
  } else if(action.actionType === 'remove') {
    remove(action.todo);
    TodoStore.emitChange();
  } else {
    console.log('unknown action type');
  }
});

module.exports = TodoStore;
