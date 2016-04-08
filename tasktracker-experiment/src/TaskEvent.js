import { Model, fk } from 'redux-orm'

export default class TaskEvent extends Model {
  static get modelName() {
    return 'TaskEvent'
  }

  static get fields() {
    return {
      task: fk('Task', 'events')
    }
  }
}
