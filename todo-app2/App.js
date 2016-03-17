import React from 'react'
import { Link } from 'react-router'

const App = ({children}) => {
  return <div>
    <h2>Todo App</h2>
    <Link to="/">Home</Link>
    {children}
    <hr />
    &copy; 2016
  </div>
}

export default App
