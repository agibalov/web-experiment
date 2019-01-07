import $ from 'jquery'
import React from 'react'
import { render } from 'react-dom'

class Dummy extends React.Component {
  render() {
    return (
      <h1>hello world</h1>
    )
  }
}

describe('react', function() {
  it('should work', function() {
    const el = document.createElement('div')

    render(<Dummy />, el)

    console.log(el)
    expect($(el).children('h1').text()).toBe('hello world')
  });
});
