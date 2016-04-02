import { Injectable } from 'angular2/core'

@Injectable()
export class CalculatorService {
    addNumbers(a: number, b: number): number {
        console.log('CalculatorService!')
        return a + b
    }
}
