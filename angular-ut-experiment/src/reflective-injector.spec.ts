import {Injectable, ReflectiveInjector} from "@angular/core";

@Injectable()
class Calculator {
    add(a: number, b: number): number {
        return a + b;
    }
}

describe('ReflectiveInjector', () => {
    it('should work', () => {
        const injector = ReflectiveInjector.resolveAndCreate([Calculator]);
        const calculator = injector.get(Calculator);
        expect(calculator instanceof Calculator).toBe(true);
    });
});
