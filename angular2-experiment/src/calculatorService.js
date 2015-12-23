import { Injectable } from 'angular2/core'

@Injectable()
export class CalculatorService {
  addNumbers(a, b) {
    return a + b
  }
}
