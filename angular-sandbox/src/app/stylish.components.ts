import {Component} from '@angular/core';

@Component({
  selector: 'app-child',
  template: `<h1>is underlined, BUT not is red</h1>`,
  styles: [`h1 { text-decoration: underline; }`]
})
export class ChildComponent {
}

@Component({
  selector: 'app-host',
  template: `
    <h1>is red</h1>
    <app-child></app-child>
    <h1>is red</h1>
  `,
  styles: [`h1 { color: red; }`]
})
export class HostComponent {
}
