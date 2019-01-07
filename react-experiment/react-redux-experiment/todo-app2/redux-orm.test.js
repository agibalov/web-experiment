import { expect } from 'chai'
import { Model, Schema } from 'redux-orm'
import { combineReducers, createStore } from 'redux'

class Todo extends Model {
  static get modelName() {
    return 'Todo'
  }

  static get fields() {
    return {}
  }

  static reducer(state, action, Todo) {
    switch(action.type) {
      case 'CREATE_TODO':
        Todo.create({
          text: action.text
        })
        break
    }

    return Todo.getNextState()
  }
}

const schema = new Schema()
schema.register(Todo)

const rootReducer = combineReducers({
  orm: schema.reducer()
})

describe('redux-orm', () => {
  it('should create a todo', () => {
    const state = rootReducer(undefined, {
      type: 'CREATE_TODO',
      text: 'hello world'
    })
    expect(state).to.deep.equal({
      orm: {
        Todo: {
          items: [0],
          itemsById: {
            '0': { id: 0, text: 'hello world' }
          }
        }
      }
    })
  })

  describe('when there are todos', () => {
    let session
    beforeEach(() => {
      const store = createStore(rootReducer)
      store.dispatch({
        type: 'CREATE_TODO',
        text: 'hello world'
      })
      store.dispatch({
        type: 'CREATE_TODO',
        text: 'hi there'
      })

      const state = store.getState()
      session = schema.from(state.orm)
    })

    it('should count all todos', () => {
      expect(session.Todo.count()).to.equal(2)
    })

    it('should give me the list of all todos', () => {
      expect(session.Todo.all().toRefArray()).to.deep.equal([{
        id: 0,
        text: 'hello world'
      }, {
        id: 1,
        text: 'hi there'
      }])
    })

    it('should give me a todo by id', () => {
      expect(session.Todo.withId(1).ref).to.deep.equal({
        id: 1,
        text: 'hi there'
      })
    })
  })

  describe('when there is a selector', () => {
    it('should work', () => {
      const store = createStore(rootReducer)

      const todoCountSelector = schema.createSelector(state => state.orm, orm => orm.Todo.count())
      expect(todoCountSelector(store.getState())).to.equal(0)

      store.dispatch({
        type: 'CREATE_TODO',
        text: 'hello world'
      })

      expect(todoCountSelector(store.getState())).to.equal(1)

      store.dispatch({
        type: 'CREATE_TODO',
        text: 'hi there'
      })

      expect(todoCountSelector(store.getState())).to.equal(2)
    })
  })
})
