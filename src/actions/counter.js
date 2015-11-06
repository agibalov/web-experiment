import 'babel-polyfill'

export const INIT = 'INIT'
export const SET_VALUE = 'SET_VALUE'
export const INCREMENT = 'INCREMENT'
export const DECREMENT = 'DECREMENT'

export function init() {
  function getInitialValue() {
    return new Promise(resolve => {
      setTimeout(() => {
        resolve(123)
      }, 1000)
    })
  }

  return dispatch => {
    (async () => {
      const initialValue = await getInitialValue()
      return initialValue
    })().then(function(initialValue) {
      dispatch(setValue(initialValue))
    })
  }
}

export function setValue(value) {
  return {
    type: SET_VALUE,
    value: value
  }
}

export function increment() {
  return {
    type: INCREMENT
  }
}

export function decrement() {
  return {
    type: DECREMENT
  }
}
