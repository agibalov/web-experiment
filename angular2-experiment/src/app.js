import { Component } from 'angular2/core'
import { Hello } from './hello'

@Component({
  selector: 'app',
  template: `
    <div class="app">
      <hello [name]="'loki2302'"></hello>
      <hello [name]="'qwerty'"></hello>
    </div>`,
  directives: [Hello]
})
export class App {
}
