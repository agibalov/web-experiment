import React from 'react'

const TodoItem = ({id, text, onRemoveClicked}) => {
  return <li>{text} (id={id}) <button type="button" onClick={onRemoveClicked}>X</button></li>
}

export default TodoItem
