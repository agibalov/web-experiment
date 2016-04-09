import React from 'react'
import {connect} from 'react-redux'
import schema from './schema'

import moment from 'moment'

import {
  createTask,
  deleteTask,
  setTaskStatus,
  submitTaskUpdate
} from './actions'

import {Task} from './TaskComponent'

const App = ({createTask, deleteTask, submitTaskUpdate, setTaskStatus, tasks}) => {
  const mapTaskToTaskItem = task => <Task
    key={task.id}
    task={task}
    submitTaskUpdate={submitTaskUpdate}
    deleteTask={deleteTask}
    setTaskStatus={setTaskStatus}/>
  const taskItems = tasks.map(mapTaskToTaskItem)

  let inputRef
  return <div className="container">
    <h1>App</h1>
    <form onSubmit={(e) => {
        e.preventDefault()
        createTask(inputRef.value)
      }} className="form-inline">
      <input type="text" ref={e => inputRef = e} className="form-control" placeholder="Task description"/>
      <button type="submit" className="btn btn-default">Create</button>
    </form>
    <ul>{taskItems}</ul>
  </div>
}

const tasksSelector = schema.createSelector((session) => {
  return session.Task.map(task => {
    return {
      id: task.id,
      text: task.text,
      createdAt: task.createdAt,
      status: task.status,
      events: task.events.map(event => {
        return {
          id: event.id,
          text: event.text,
          createdAt: event.createdAt,
          type: event.type,
          oldStatus: event.oldStatus,
          newStatus: event.newStatus
        }
      })
    }
  })
})

export default connect((state) => {
  return {
    tasks: tasksSelector(state.app)
  }
}, (dispatch) => {
  return {
    createTask: (text) => {
      dispatch(createTask({
        text: text,
        createdAt: moment().toISOString()
      }))
    },
    deleteTask: (taskId) => {
      dispatch(deleteTask({
        taskId: taskId,
        when: moment().toISOString()
      }))
    },
    setTaskStatus: (taskId, status) => {
      dispatch(setTaskStatus({
        taskId: taskId,
        status: status,
        createdAt: moment().toISOString()
      }))
    },
    submitTaskUpdate: (text, taskId) => {
      dispatch(submitTaskUpdate({
        text: text,
        createdAt: moment().toISOString(),
        taskId: taskId
      }))
    }
  }
})(App)
