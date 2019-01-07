import { Schema } from 'redux-orm'
import Task from './Task'
import TaskEvent from './TaskEvent'

const schema = new Schema()
schema.register(Task, TaskEvent)

export default schema
