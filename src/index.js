import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import App from './containers/App'
import configureStore from './store/configureStore'

const store = configureStore({
  counter: 5
})

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
)

// -------------------
import 'babel-polyfill'

function doSomething() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve('hi there');
    }, 300);
  })
}

async function run() {
  console.log('x is', await doSomething())
  console.log('x is', await doSomething())
  console.log('x is', await doSomething())
  return 123;
};

run().then(result => {
  console.log('DONE!', result)
})
