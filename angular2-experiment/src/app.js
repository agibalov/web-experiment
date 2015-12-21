import { Component } from 'angular2/core'
import { Hello } from './hello'

@Component({
  selector: 'app',
  template: '<div class="app"><hello></hello><hello></hello></div>',
  directives: [Hello]
})
export class App {
}
