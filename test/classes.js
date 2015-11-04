import { expect } from 'chai'

describe('class', () => {
  it('should work', () => {
    class Calculator {
      add(a, b) {
        return a + b
      }
    }

    const calculator = new Calculator()
    expect(calculator.add(2, 3)).to.equal(5)
  })
})
