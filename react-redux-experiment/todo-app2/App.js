import React from 'react'
import { Link } from 'react-router'

export default ({children}) => {
  return <div className="container">
    <h2>Todo App</h2>
    <Link to="/">Home</Link>
    {children}
    <hr />
    &copy; 2016
  </div>
}
