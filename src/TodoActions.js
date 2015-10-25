var AppDispatcher = require('./AppDispatcher');

var TodoActions = {

  add: function() {
    AppDispatcher.dispatch({
      actionType: 'add'
    });
  },

  remove: function(todo) {
    AppDispatcher.dispatch({
      actionType: 'remove',
      todo: todo
    });
  }

};

module.exports = TodoActions;
