export const INCREMENT = 'INCREMENT'
export const DECREMENT = 'DECREMENT'

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

export function incrementAsync() {
  function doTheComputation() {
    return new Promise(resolve => {
      setTimeout(() => {
        resolve('hi there')
      }, 1000)
    })
  }

  console.log('incrementAsync()')

  return dispatch => {
    console.log('incrementAsync() - thunk start');

    (async () => {
      console.log('incrementAsync() - before doTheComputation()')
      let result = await doTheComputation()
      console.log('incrementAsync() - after doTheComputation()', result)
    })().then(function() {
      console.log('incrementAsync() - before dispatch()')
      dispatch(increment())
      console.log('incrementAsync() - after dispatch()')
    })
  }
}
