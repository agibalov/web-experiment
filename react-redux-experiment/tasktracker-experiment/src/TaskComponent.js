import React from 'react'

import classNames from 'classnames'

import {
  STATUS_NEW,
  STATUS_IN_PROGRESS,
  STATUS_DONE,
  formatStatus,
  formatClassName
} from './TaskStatus'

import { formatTime } from './presentationConcerns'

import { EventItem } from './EventItem'

export const Task = ({ task, submitTaskUpdate, setTaskStatus, deleteTask }) => {
  let eventsElement
  if(task.events.length === 0) {
    eventsElement = <div>No events so far</div>
  } else {
    const mapEventToEventItem = e => <EventItem key={e.id} event={e} />
    const eventItems = task.events.map(mapEventToEventItem)
    eventsElement = <ul>{eventItems}</ul>
  }

  let inputRef
  return <li>
    ({task.id}) {task.text} <span className={classNames('label', formatClassName(task.status))}>{formatStatus(task.status)}</span> [{formatTime(task.createdAt)}]
    <button type="button" onClick={() => { deleteTask(task.id) }} className="btn btn-danger">Delete</button>
    <button type="button" onClick={() => { setTaskStatus(task.id, STATUS_NEW) }} className="btn btn-default">New</button>
    <button type="button" onClick={() => { setTaskStatus(task.id, STATUS_IN_PROGRESS) }} className="btn btn-default">In Progress</button>
    <button type="button" onClick={() => { setTaskStatus(task.id, STATUS_DONE) }} className="btn btn-default">Done</button>
    <form onSubmit={(e) => {
        e.preventDefault()
        submitTaskUpdate(inputRef.value, task.id)
      }} className="form-inline">
      <input type="text" ref={e => inputRef = e} className="form-control" placeholder="Status update" />
      <button type="submit" className="btn btn-default">Create</button>
    </form>
    {eventsElement}
  </li>
}
