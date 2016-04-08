import React from 'react'
import { connect } from 'react-redux'
import schema from './schema'

import moment from 'moment'

import classNames from 'classnames'

import {
  STATUS_NEW,
  STATUS_IN_PROGRESS,
  STATUS_DONE,
  formatStatus,
  formatClassName
} from './TaskStatus'

const formatTime = (isoTime) => moment(isoTime).format('[on] MMMM D YYYY [at] h:mm:ss A')

const EventItem = ({event}) => {
  return <li>{event.text} [{formatTime(event.createdAt)}]</li>
}

const Task = ({ task, submitTaskEvent, setTaskStatus, deleteTask }) => {
  const events = task.events.map(e => <EventItem key={e.id} event={e} />)

  let eventsElement
  if(events.length === 0) {
    eventsElement = <div>No events so far</div>
  } else {
    eventsElement = <ul>{events}</ul>
  }

  let inputRef
  return <li key={task.id}>
    ({task.id}) {task.text} <span className={classNames('label', formatClassName(task.status))}>{formatStatus(task.status)}</span> [{formatTime(task.createdAt)}]
    <button type="button" onClick={() => { deleteTask(task.id) }} className="btn btn-danger">Delete</button>
    <button type="button" onClick={() => { setTaskStatus(task.id, STATUS_NEW) }} className="btn btn-default">New</button>
    <button type="button" onClick={() => { setTaskStatus(task.id, STATUS_IN_PROGRESS) }} className="btn btn-default">In Progress</button>
    <button type="button" onClick={() => { setTaskStatus(task.id, STATUS_DONE) }} className="btn btn-default">Done</button>
    <form onSubmit={(e) => {
        e.preventDefault()
        submitTaskEvent(inputRef.value, task.id)
      }} className="form-inline">
      <input type="text" ref={e => inputRef = e} className="form-control" placeholder="Status update" />
      <button type="submit" className="btn btn-default">Create</button>
    </form>
    {eventsElement}
  </li>
}

const App = ({ createTask, deleteTask, submitTaskEvent, setTaskStatus, tasks }) => {
  const taskElements = tasks.map(t => <Task
    key={t.id}
    task={t}
    submitTaskEvent={submitTaskEvent}
    deleteTask={deleteTask}
    setTaskStatus={setTaskStatus} />)

  let inputRef
  return <div className="container">
    <h1>App</h1>
    <form onSubmit={(e) => {
        e.preventDefault()
        createTask(inputRef.value)
      }} className="form-inline">
      <input type="text" ref={e => inputRef = e} className="form-control" placeholder="Task description" />
      <button type="submit" className="btn btn-default">Create</button>
    </form>
    <ul>{taskElements}</ul>
  </div>
}

const tasksSelector = schema.createSelector((session) => {
  return session.Task.map(t => {
    return {
      id: t.id,
      text: t.text,
      createdAt: t.createdAt,
      status: t.status,
      events: t.events.map(e => {
        return {
          id: e.id,
          text: e.text,
          createdAt: e.createdAt
        }
      })
    }
  })
})

const mapStateToProps = (state) => {
  return {
    tasks: tasksSelector(state.app)
  }
}

export default connect(mapStateToProps, (dispatch) => {
  return {
    createTask: (text) => {
      dispatch({
        type: 'CREATE_TASK',
        text: text,
        createdAt: moment().toISOString()
      })
    },
    deleteTask: (taskId) => {
      dispatch({
        type: 'DELETE_TASK',
        taskId: taskId,
        when: moment().toISOString()
      })
    },
    setTaskStatus: (taskId, status) => {
      dispatch({
        type: 'SET_TASK_STATUS',
        taskId: taskId,
        status: status,
        createdAt: moment().toISOString()
      })
    },
    submitTaskEvent: (text, taskId) => {
      dispatch({
        type: 'CREATE_TASK_EVENT',
        text: text,
        createdAt: moment().toISOString(),
        taskId: taskId
      })
    }
  }
})(App)
