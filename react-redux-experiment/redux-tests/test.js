'use strict';

const expect = require('chai').expect;
const createStore = require('redux').createStore;
const applyMiddleware = require('redux').applyMiddleware;

describe('store', () => {
  it('should middleware', () => {
    const store = createStore((state, action) => {
      if(action.type === 'INIT') {
        return {
          count: 0
        };
      } else if(action.type === 'INCREMENT') {
        return {
          count: state.count + 1
        };
      } else if(action.type === 'DECREMENT') {
        return {
          count: state.count - 1
        };
      } else {
        return state;
      }
    }, applyMiddleware((context) => {
      console.log(context.dispatch, context.getState);
      return next => action => {
        console.log('before', action); // action is 'action object'
        const result = next(action);
        console.log('after', action, result); // result is ??? action object ???
        return result;
      };
    }));

    store.subscribe(() => console.log(store.getState()));

    store.dispatch({ type: 'INIT' });
    store.dispatch({ type: 'INCREMENT' });
    store.dispatch({ type: 'INCREMENT' });
    store.dispatch({ type: 'DECREMENT' });
  });

  it('should work', () => {
    const store = createStore((state, action) => {
      if(action.type === 'INIT') {
        return {
          count: 0
        };
      } else if(action.type === 'INCREMENT') {
        return {
          count: state.count + 1
        };
      } else if(action.type === 'DECREMENT') {
        return {
          count: state.count - 1
        };
      } else {
        return state;
      }
    }/*, {put initial state here}*/);

    var snapshots = [];
    store.subscribe(() => snapshots.push(store.getState()));

    store.dispatch({ type: 'INIT' });
    store.dispatch({ type: 'INCREMENT' });
    store.dispatch({ type: 'INCREMENT' });
    store.dispatch({ type: 'DECREMENT' });

    expect(snapshots).to.deep.equal([
      { count: 0 },
      { count: 1 },
      { count: 2 },
      { count: 1 }
    ]);
  });
});
