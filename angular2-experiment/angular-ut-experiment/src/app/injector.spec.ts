import {InjectionToken, Injector} from '@angular/core';

describe('Injector', () => {
  describe('Basic scenarios', () => {
    it('should allow me to get values', () => {
      const DUMMY = new InjectionToken('dummy');

      const injector = Injector.create([
        { provide: DUMMY, useValue: 'hello world' }
      ]);

      expect(injector.get(DUMMY)).toEqual('hello world');
    });

    it(`should throw if there's no provider and no default value`, () => {
      const DUMMY = new InjectionToken('dummy');
      const injector = Injector.create([]);
      expect(() => injector.get(DUMMY)).toThrow();
    });

    it(`should provide null value if there's no provider, but there's a default value`, () => {
      const DUMMY = new InjectionToken('dummy');
      const injector = Injector.create([]);
      expect(injector.get(DUMMY, 'default value')).toEqual('default value');
    });
  });

  describe('Multi-injection', () => {
    it('should work', () => {
      const DUMMY = new InjectionToken('dummy');

      const injector = Injector.create([
        { provide: DUMMY, useValue: 'value 1', multi: true },
        { provide: DUMMY, useValue: 'value 2', multi: true },
        { provide: DUMMY, useValue: 'value 3', multi: true }
      ]);

      const dummies = injector.get(DUMMY);
      expect(dummies).toContain('value 1');
      expect(dummies).toContain('value 2');
      expect(dummies).toContain('value 3');
    });
  });

  describe('Basic dependency injection', () => {
    class Adder {
      add(a: number, b: number): number {
        return a + b;
      }
    }

    class Subtractor {
      subtract(a: number, b: number): number {
        return a - b;
      }
    }

    class Calculator {
      constructor(
        private adder: Adder,
        private subtractor: Subtractor) {
      }

      add(a: number, b: number): number {
        return this.adder.add(a, b);
      }

      subtract(a: number, b: number): number {
        return this.subtractor.subtract(a, b);
      }
    }

    it('should work', () => {
      const injector = Injector.create([
        { provide: Adder, deps: [] },
        { provide: Subtractor, deps: [] },
        { provide: Calculator, deps: [ Adder, Subtractor ] }
      ]);
      const calculator = injector.get(Calculator);
      expect(calculator).toBeDefined();
      expect(calculator.add(2, 3)).toEqual(5);
    });
  });

  describe('Plugin-style dependency injection', () => {
    const COMMAND_HANDLER = new InjectionToken('CommandHandler');
    interface CommandHandler {
      doSomething();
    }
    class CommandHandlerOne implements CommandHandler {
      doSomething() {
      }
    }
    class CommandHandlerTwo implements CommandHandler {
      doSomething() {
      }
    }

    class SomeService {
      constructor(public commandHandlers: CommandHandler[]) {
      }
    }

    it('should work', () => {
      const injector = Injector.create([
        { provide: COMMAND_HANDLER, useClass: CommandHandlerOne, deps: [], multi: true },
        { provide: COMMAND_HANDLER, useClass: CommandHandlerTwo, deps: [], multi: true },
        { provide: SomeService, deps: [ COMMAND_HANDLER ] }
      ]);
      const someService = injector.get(SomeService);
      expect(someService).toBeDefined();
      expect(someService.commandHandlers.length).toEqual(2);
    });
  });
});
