import { Component } from 'angular2/core'
import { Hello } from './hello'

@Component({
  selector: 'page1',
  template: `
      <hello [name]="'loki2302'"></hello>
      <hello [name]="'qwerty'"></hello>`,
  directives: [Hello]
})
export class Page1 {
}
