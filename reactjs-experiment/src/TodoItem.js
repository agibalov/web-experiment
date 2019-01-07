var React = require('react');

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

module.exports = TodoItem;
