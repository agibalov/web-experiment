import { expect } from 'chai'

describe('observe', () => {
  describe('object', () => {
    it('should work', done => {
      var o = {
        name: 'loki2302',
        age: 40
      }

      Object.observe(o, changes => {
        expect(changes.length).to.equal(1)
        expect(changes[0].type).to.equal('update')
        expect(changes[0].object).to.equal(o)
        expect(changes[0].name).to.equal('name')
        expect(changes[0].oldValue).to.equal('loki2302')

        done()
      })

      o.name = 'qwerty'
    })
  })

  describe('array', () => {
    it('should work', done => {
      var a = [11, 22, 33]

      Array.observe(a, changes => {
        expect(changes.length).to.equal(1)
        expect(changes[0].type).to.equal('splice')
        expect(changes[0].object).to.equal(a)
        expect(changes[0].index).to.equal(3)
        expect(changes[0].removed).to.deep.equal([])
        expect(changes[0].addedCount).to.equal(1)

        done()
      })

      a.push(999)
    })
  })
})
