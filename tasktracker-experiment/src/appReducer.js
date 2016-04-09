import schema from './schema'

import {
  STATUS_NEW
} from './TaskStatus'

import {
  EVENT_TYPE_CREATED,
  EVENT_TYPE_STATUS_CHANGE,
  EVENT_TYPE_UPDATE
} from './TaskEventType'

import { handleActions } from 'redux-actions'

import {
  CREATE_TASK,
  DELETE_TASK,
  SET_TASK_STATUS,
  SUBMIT_TASK_UPDATE
} from './actions'

export default handleActions({
  [CREATE_TASK]: (state, { payload }) => {
    const session = schema.from(state)

    const task = session.Task.create({
      text: payload.text,
      createdAt: payload.createdAt,
      status: STATUS_NEW
    })

    session.TaskEvent.create({
      task: task.id,
      createdAt: payload.createdAt,
      type: EVENT_TYPE_CREATED
    })

    return session.getNextState()
  },

  [DELETE_TASK]: (state, { payload }) => {
    const session = schema.from(state)

    console.log('delete clicked', payload.taskId)

    return session.getNextState()
  },

  [SET_TASK_STATUS]: (state, { payload }) => {
    const session = schema.from(state)

    const task = session.Task.withId(payload.taskId)
    const oldStatus = task.status
    const newStatus = payload.status

    task.status = payload.status
    session.TaskEvent.create({
      task: payload.taskId,
      createdAt: payload.createdAt,
      type: EVENT_TYPE_STATUS_CHANGE,
      oldStatus: oldStatus,
      newStatus: newStatus
    })

    return session.getNextState()
  },

  [SUBMIT_TASK_UPDATE]: (state, { payload }) => {
    const session = schema.from(state)

    session.TaskEvent.create({
      createdAt: payload.createdAt,
      task: payload.taskId,
      type: EVENT_TYPE_UPDATE,
      text: payload.text
    })

    return session.getNextState()
  }
}, schema.getDefaultState())
