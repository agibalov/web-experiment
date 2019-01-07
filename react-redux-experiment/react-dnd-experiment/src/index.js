require('./style.less')

import React from 'react'
import { render } from 'react-dom'
import { DragSource, DropTarget, DragDropContext } from 'react-dnd'
import HTML5Backend from 'react-dnd-html5-backend'

const Card = ({ isDragging, connectDragSource, text }) => {
  return connectDragSource(<div style={{
    backgroundColor: isDragging ? 'red' : 'green',
    width: 100,
    height: 30
  }}>{text}</div>)
}
const ConnectedCard = DragSource('CARD', {
  beginDrag(props, monitor, component) {
    console.log('DRAG!', props)
    return {
      text: props.text
    }
  },
  endDrag(props, monitor, component) {
    console.log('END DRAG!', props, monitor.getDropResult())
  }
}, (connect, monitor) => {
  return {
    connectDragSource: connect.dragSource(),
    isDragging: monitor.isDragging()
  }
})(Card)

const Box = ({ isOver, connectDropTarget, name }) => {
  return connectDropTarget(<div style={{
    backgroundColor: isOver ? 'yellow' : 'pink',
    width: 200,
    height: 200
  }}>{name}</div>)
}
const ConnectedBox = DropTarget('CARD', {
  drop(props, monitor, component) {
    // the 'props' is ConnectedBox's props, not ConnectedCard's props
    console.log('DROP!', props.name)
    return { // ConnectedCard::endDrag() gets this in monitor.getDropResult()
      message: 'Dropped to ' + props.name
    }
  }
}, (connect, monitor) => {
  return {
    connectDropTarget: connect.dropTarget(),
    isOver: monitor.isOver()
  }
})(Box)

const Board = () => {
  return <div>
    <ConnectedCard text="omg" />
    <ConnectedCard text="wtf" />
    <ConnectedBox name="box1" />
    <ConnectedBox name="box2" />
  </div>
}
const ConnectedBoard = DragDropContext(HTML5Backend)(Board)

render(<ConnectedBoard />, document.getElementById('root'))