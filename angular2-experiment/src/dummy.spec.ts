import { inject, TestBed } from '@angular/core/testing';
import { CalculatorService } from './calculator.service';

describe('dummy', () => {
  it('should work', () => {
    expect(true).toBe(true);
  })
});

describe('CalculatorService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [ CalculatorService ]
  }));

  it('should increase', inject([ CalculatorService ], (calculatorService: CalculatorService) => {
    expect(calculatorService.getPlusOne(2)).toEqual(3);
  }));

  it('should decrease', inject([ CalculatorService ], (calculatorService: CalculatorService) => {
    expect(calculatorService.getMinusOne(2)).toEqual(1);
  }));
});

// Ideally, this code should be a part of shim, but I didn't manage to make it work
import { BrowserDynamicTestingModule, platformBrowserDynamicTesting } from '@angular/platform-browser-dynamic/testing';
TestBed.initTestEnvironment(BrowserDynamicTestingModule, platformBrowserDynamicTesting());
//
