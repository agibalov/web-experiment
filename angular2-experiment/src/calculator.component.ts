import { Component } from '@angular/core';
import { CalculatorService } from './calculator.service';

@Component({
  template: `<div>
    <h1>hello world {{counter | numberToWord }} ({{counter | numberToWord: true }})</h1>
    <input type="text" [value]="counter" #counterInput (blur)="setValue(counterInput.value)">
    <button type="button" (click)="decrement()" class="decrease">Decrement</button>
    <button type="button" (click)="increment()" class="increase">Increment</button>
  </div>`
})
export class CalculatorComponent {
  private calculatorService: CalculatorService;
  public counter: number = 0;

  constructor(calculatorService: CalculatorService) {
    this.calculatorService = calculatorService;
  }

  increment(): void {
    this.counter = this.calculatorService.getPlusOne(this.counter);
  }

  decrement(): void {
    this.counter = this.calculatorService.getMinusOne(this.counter);
  } 

  setValue(value: number): void {
    console.log('setting value explicitly');
    this.counter = value;
  }
}
