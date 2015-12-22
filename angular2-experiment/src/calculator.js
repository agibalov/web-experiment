import { Component } from 'angular2/core'

@Component({
  selector: 'calculator',
  template: `
    <h2>Calculator</h2>
    <input type="text" [(ngModel)]="a">
    <input type="text" [(ngModel)]="b">
    <button type="button" (click)="onAdd()">Add</button>
    <span>The result is {{result}}</span>
  `
})
export class Calculator {
  constructor() {
    this.a = 2
    this.b = 3
    this.result = 0
  }

  onAdd() { // this handler is called, but UI is never updated
    this.result = parseInt(this.a) + parseInt(this.b)
    console.log('clicked', this.result)
  }
}
