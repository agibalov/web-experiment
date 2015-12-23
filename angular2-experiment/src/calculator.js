import { Component, Injectable, Inject } from 'angular2/core'
import { CalculatorService } from './calculatorService'

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
// @Inject(CalculatorService) // does not work
export class Calculator {
  static parameters = [new Inject(CalculatorService)] // works

  constructor(calculatorService) {
    console.log('calculator service', calculatorService)
    this.a = 2
    this.b = 3
    this.result = 0
    this.calculatorService = calculatorService
  }

  onAdd() {
    this.result = this.calculatorService.addNumbers(parseInt(this.a), parseInt(this.b))
    console.log('clicked', this.result)
  }
}
