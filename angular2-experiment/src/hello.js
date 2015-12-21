import { Component } from 'angular2/core'

@Component({
  selector: 'hello',
  template: '<h1>hello {{name}}</h1>',
  inputs: ['name']
})
export class Hello {
}
