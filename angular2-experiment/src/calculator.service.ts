import { Injectable } from '@angular/core';
import { Wove } from 'aspect.js';

@Wove()
@Injectable()
export class CalculatorService {
  constructor() {
    console.log('CalculatorService instantiated!');
  }

  getPlusOne(x: number): number {
    console.log('CalculatorService::getPlusOne() called');
    return x + 1;
  }

  getMinusOne(x: number): number {
    console.log('CalculatorService::getMinusOne() called');
    return x - 1;
  }
}
