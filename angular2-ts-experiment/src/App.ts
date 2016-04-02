import { Component, Inject } from 'angular2/core'
import { CalculatorService } from "./CalculatorService";

@Component({
    selector: 'app',
    template: `
        <h1>Calculator</h1>
        <input type="text" [(ngModel)]="a">
        <input type="text" [(ngModel)]="b">
        <button type="button" (click)="onAdd()">Add</button>
        <span>The result is {{result}}</span>
    `
})
export class App {
    a: number = 2
    b: number = 3
    result: number = 0
    calculator: CalculatorService

    constructor(@Inject(CalculatorService) calculator: CalculatorService) {
        this.calculator = calculator
    }

    onAdd() {
        this.result = this.calculator.addNumbers(this.a, this.b)
    }
}
