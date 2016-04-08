import { Model } from 'redux-orm'

export default class Task extends Model {
  static get modelName() {
    return 'Task'
  }

  static get fields() {
    return {}
  }
}
