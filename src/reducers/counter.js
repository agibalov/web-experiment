import { INIT, SET_VALUE, INCREMENT, DECREMENT } from '../actions/counter'

export default function counter(state = 0, action) {
  switch (action.type) {
    case INIT:
      return -1
    case SET_VALUE:
      return action.value
    case INCREMENT:
      return state + 1
    case DECREMENT:
      return state - 1
    default:
      return state
  }
}
