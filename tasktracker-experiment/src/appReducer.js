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

export default function appReducer(state, action) {
  const session = schema.from(state)

  if(action.type === 'CREATE_TASK') {
    const t = session.Task.create({
      text: action.text,
      createdAt: action.createdAt,
      status: STATUS_NEW
    })

    session.TaskEvent.create({
      task: t.id,
      createdAt: action.createdAt,
      type: EVENT_TYPE_CREATED,
      text: formatEventType(EVENT_TYPE_CREATED)
    })
  }

  if(action.type === 'DELETE_TASK') {
    console.log('delete clicked', action.taskId)
  }

  if(action.type === 'SET_TASK_STATUS') {
    session.Task.withId(action.taskId).status = action.status
    session.TaskEvent.create({
      task: action.taskId,
      createdAt: action.createdAt,
      type: EVENT_TYPE_STATUS_CHANGE,
      text: `${formatEventType(EVENT_TYPE_STATUS_CHANGE)} ${formatStatus(action.status)}`
    })
  }

  if(action.type === 'CREATE_TASK_EVENT') {
    session.TaskEvent.create({
      createdAt: action.createdAt,
      task: action.taskId,
      type: EVENT_TYPE_UPDATE,
      text: `${formatEventType(EVENT_TYPE_UPDATE)} ${action.text}`
    })
  }

  return session.getNextState()
}
