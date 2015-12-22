import { Component } from 'angular2/core'
import { Hello } from './hello'
import { Calculator } from './calculator'

@Component({
  selector: 'app',
  template: `
    <div class="app">
      <hello [name]="'loki2302'"></hello>
      <hello [name]="'qwerty'"></hello>
      <calculator></calculator>
    </div>`,
  directives: [Hello, Calculator]
})
export class App {
}
