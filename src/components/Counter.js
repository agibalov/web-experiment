import React from 'react'

class Counter extends React.Component {
  render() {
    return (
      <div>
        <button onClick={this.props.increment}>Increment</button>
        <button onClick={this.props.decrement}>Decrement</button>
        <h3>{this.props.counter}</h3>
      </div>
    )
  }
}

export default Counter
