var React = require('react');
var TodoItem = require('./TodoItem');

var TodoList = React.createClass({
  removeItem: function(item) {
    this.props.removeItem(item);
  },
  render: function() {
    var that = this;
    var itemNodes = this.props.items.map(function(item) {
      return <li key={item.id}><TodoItem item={item} onRemove={that.removeItem} /></li>
    });
    return <div>
      <p>Item count: {this.props.items.length}</p>
      <ul>
        {itemNodes}
      </ul>
    </div>
  }
});

module.exports = TodoList;
