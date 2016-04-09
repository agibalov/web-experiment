import schema from './schema'

import {
  STATUS_NEW,
  STATUS_IN_PROGRESS,
  STATUS_DONE,
  formatStatus
} from './TaskStatus'

import {
  EVENT_TYPE_CREATED,
  EVENT_TYPE_DELETED,
  EVENT_TYPE_STATUS_CHANGE,
  EVENT_TYPE_UPDATE,
  formatEventType
} from './TaskEventType'

import { handleActions } from 'redux-actions'

import {
  CREATE_TASK,
  DELETE_TASK,
  SET_TASK_STATUS,
  CREATE_TASK_EVENT
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
      type: EVENT_TYPE_CREATED,
      text: formatEventType(EVENT_TYPE_CREATED)
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

    session.Task.withId(payload.taskId).status = payload.status
    session.TaskEvent.create({
      task: payload.taskId,
      createdAt: payload.createdAt,
      type: EVENT_TYPE_STATUS_CHANGE,
      text: `${formatEventType(EVENT_TYPE_STATUS_CHANGE)} ${formatStatus(payload.status)}`
    })

    return session.getNextState()
  },

  [CREATE_TASK_EVENT]: (state, { payload }) => {
    const session = schema.from(state)

    session.TaskEvent.create({
      createdAt: payload.createdAt,
      task: payload.taskId,
      type: EVENT_TYPE_UPDATE,
      text: `${formatEventType(EVENT_TYPE_UPDATE)} ${payload.text}`
    })

    return session.getNextState()
  }
}, schema.getDefaultState())
