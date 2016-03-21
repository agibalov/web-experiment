import { expect } from 'chai'
import todosReducer from './todosReducer'

describe('todosReducer', () => {
  it('should provide the initial state', () => {
    expect(todosReducer(undefined, {})).to.deep.equal({})
  })

  it('should handle TODOS_LOAD_STARTED', () => {
    expect(todosReducer({}, {
      type: 'TODOS_LOAD_STARTED'
    })).to.deep.equal({
      loading: true
    })
  })

  it('should handle TODOS_LOAD_SUCCEEDED', () => {
    expect(todosReducer({
      loading: true
    }, {
      type: 'TODOS_LOAD_SUCCEEDED',
      todos: [1, 2, 3]
    })).to.deep.equal({
      loading: false,
      items: [1, 2, 3]
    })
  })

  it('should ignore TODOS_LOAD_FAILED', () => {
    expect(todosReducer({}, {
      type: 'TODOS_LOAD_FAILED'
    })).to.deep.equal({})
  })
})
