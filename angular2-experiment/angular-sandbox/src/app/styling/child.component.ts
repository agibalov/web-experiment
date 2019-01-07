import {Component} from '@angular/core';

@Component({
  selector: 'app-child',
  template: `<h1>is underlined, BUT not is red</h1>`,
  styles: [`h1 { text-decoration: underline; }`]
})
export class ChildComponent {
}
