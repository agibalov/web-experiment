import { expect } from 'chai'

describe('classes', () => {
  describe('the most primitive case', () => {
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

  describe('inheritance', () => {
    it('should work', () => {
      class Animal {
        makeSound() {
          return 'default sound'
        }
      }

      class Cat extends Animal {
        makeSound() {
          return 'meow'
        }

        makeParentSound() {
          return super.makeSound()
        }
      }

      const cat = new Cat()
      expect(cat.makeSound()).to.equal('meow')
      expect(cat.makeParentSound()).to.equal('default sound')
    })
  })
})
