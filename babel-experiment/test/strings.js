import { expect } from 'chai'

describe('template literals', () => {
  it('should work', () => {
    const name = 'loki2302'
    const message = `hi ${name}!`
    expect(message).to.equal('hi loki2302!')
  })
})
