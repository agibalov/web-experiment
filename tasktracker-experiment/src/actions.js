import { createAction } from 'redux-actions'

export const CREATE_TASK = 'CREATE_TASK'
export const createTask = createAction(CREATE_TASK)

export const DELETE_TASK = 'DELETE_TASK'
export const deleteTask = createAction(DELETE_TASK)

export const SET_TASK_STATUS = 'SET_TASK_STATUS'
export const setTaskStatus = createAction(SET_TASK_STATUS)

export const CREATE_TASK_EVENT = 'CREATE_TASK_EVENT'
export const createTaskEvent = createAction(CREATE_TASK_EVENT)
