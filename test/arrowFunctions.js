import { expect } from 'chai'

describe('arrow function', () => {
  it('should work', () => {
    const add = (a, b) => a + b
    expect(add(2, 3)).to.equal(5)
  })
})
