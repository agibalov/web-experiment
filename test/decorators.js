import { expect } from 'chai'

xdescribe('decorators', () => {
  it('should work', () => {
    function magic(target, key, description) {
      console.log('magic!')
    }

    class SomeClass {
      @magic
      someMethod() {
        return 'hi there'
      }
    }

    const x = new SomeClass()
    x.someMethod() // TypeError: x.someMethod is not a function

    // https://github.com/babel/babel/issues/2645
  })
})
