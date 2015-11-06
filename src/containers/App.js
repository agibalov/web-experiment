import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as CounterActions from '../actions/counter'
import Counter from '../components/Counter'

class App extends React.Component {
  componentWillMount() {
    this.props.init()
  }

  render() {
    return (
      <div>
        <div>{this.props.message}</div>
        <Counter
          increment={this.props.increment}
          decrement={this.props.decrement}
          counter={this.props.counter} />
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    counter: state.counter
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(CounterActions, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(App)
