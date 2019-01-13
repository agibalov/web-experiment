import 'babel-polyfill'
import { expect } from 'chai'

describe('async function', () => {
  it('should work', done => {

    const addNumbers = (a, b) => new Promise((resolve, reject) => {
      setTimeout(() => resolve(a + b), 1)
    })

    const someAlgorithm = async () => {
      const twoAndThree = await addNumbers(2, 3)
      const tenAndTwenty = await addNumbers(10, 20)
      return twoAndThree + tenAndTwenty
    }

    someAlgorithm().then(function(result) {
      expect(result).to.equal(2 + 3 + 10 + 20)
      done()
    })
  })
})
