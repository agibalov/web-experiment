import React from 'react'
import { render } from 'react-dom'
import { Router, Route, Link, browserHistory, hashHistory } from 'react-router'

const Page1 = () => {
  const a = 2
  const b = 3
  return <div>
    I am page 1. Go to <Link to={`/page2`}>Page 2</Link>. Go to <Link to={`/addNumbers/${a}/${b}`}>Add numbers</Link>.
  </div>
}

const Page2 = () => {
  return <div>
    I am page 2. Go to <Link to={`/`}>Page 1</Link>
  </div>
}

const AddNumbers = ({ params }) => {
  const a = parseInt(params.a)
  const b = parseInt(params.b)
  const sum = a + b
  return <div>Add numbers {a} and {b}: {sum}. Go to <Link to="/">Page 1</Link></div>
}

let history = hashHistory // or browserHistory (HTML5 URLs)

render(
  <Router history={history}>
    <Route path="/" component={Page1} />
    <Route path="/page2" component={Page2} />
    <Route path="/addNumbers/:a/:b" component={AddNumbers} />
  </Router>,
  document.getElementById('root')
)
