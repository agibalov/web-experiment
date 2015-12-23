import { expect } from 'chai'

describe('decorators', () => {
  it('should work', () => {
    function magic(target, key, description) {
      target.message = 'hello there' // applies to target object, not to method
    }

    class SomeClass {
      @magic
      someMethod() {
        return 'hi there'
      }
    }

    const x = new SomeClass()
    expect(x.message).to.equal('hello there')
  })
})
