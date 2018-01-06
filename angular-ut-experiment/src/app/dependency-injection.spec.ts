import {TestBed, async, inject} from '@angular/core/testing';
import {Component, Injectable} from '@angular/core';

@Injectable()
class Adder {
  add(a: number, b: number): number {
    return a + b;
  }
}

@Injectable()
class Subtractor {
  subtract(a: number, b: number): number {
    return a - b;
  }
}

@Injectable()
class Calculator {
  constructor(
    private adder: Adder,
    private subtractor: Subtractor)
  {}

  add(a: number, b: number): number {
    return this.adder.add(a, b);
  }

  subtract(a: number, b: number): number {
    return this.subtractor.subtract(a, b);
  }
}

describe('Dependency injection', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      providers: [
        Calculator,
        Adder,
        Subtractor
      ],
    });
  }));

  it('can get service by type', async(() => {
    const calculator: Calculator = TestBed.get(Calculator);
    expect(calculator.add(2, 3)).toBe(5);
  }));

  it('can override service by type', async(() => {
    TestBed.overrideProvider(Adder, {
      useValue: {
        add(a, b) {
          return 123;
        }
      }
    });
    const calculator: Calculator = TestBed.get(Calculator);
    expect(calculator.add(2, 3)).toBe(123);
  }));

  it('can use a spy', async(() => {
    const adder: Adder = TestBed.get(Adder);
    spyOn(adder, 'add').and.returnValue(222);

    const calculator: Calculator = TestBed.get(Calculator);
    expect(calculator.add(2, 3)).toBe(222);
  }));

  it('can use inject()', async(inject([Calculator, Adder], (calculator, adder) => {
    expect(calculator instanceof Calculator).toBeTruthy();
    expect(adder instanceof Adder).toBeTruthy();
  })));
});
