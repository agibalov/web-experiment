import {Injectable, NgModule} from '@angular/core';
import {JitCompilerFactory} from '@angular/platform-browser-dynamic';

describe('CompilerFactory', () => {
  @Injectable()
  class Adder {
    add(a: number, b: number): number {
      return a + b;
    }
  }

  @Injectable()
  class Calculator {
    constructor(private adder: Adder) {}

    addNumbers(a: number, b: number): number {
      return this.adder.add(a, b);
    }
  }

  @NgModule({
    providers: [
      Adder,
      Calculator
    ]
  })
  class DummyModule {
  }

  it('should work', () => {
    // white .d.ts doesn't describe the constructor, it's there in the implementation
    const compilerFactory = new (<any>JitCompilerFactory)({ useJit: true });
    const compiler = compilerFactory.createCompiler();
    const dummyModuleFactory = compiler.compileModuleSync(DummyModule);
    const dummyModuleRef = dummyModuleFactory.create(null);
    const injector = dummyModuleRef.injector;
    const calculator = injector.get(Calculator);
    expect(calculator.addNumbers(2, 3)).toEqual(5);
  });
});
