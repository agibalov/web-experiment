import {Injectable, ReflectiveInjector} from "@angular/core";

describe('ReflectiveInjector', () => {
    @Injectable()
    class Calculator {
        add(a: number, b: number): number {
            return a + b;
        }
    }

    it('should work', () => {
        const injector = ReflectiveInjector.resolveAndCreate([Calculator]);
        const calculator = injector.get(Calculator);
        expect(calculator instanceof Calculator).toBe(true);
    });
});
