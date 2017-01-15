import {Injectable} from "@angular/core";
import {TestBed} from "@angular/core/testing";

describe('CalculatorService', () => {
    @Injectable()
    class CalculatorService {
        add(a: number, b: number): number {
            return a + b
        }
    }

    it('should work', () => {
        TestBed.configureTestingModule({
            providers: [ CalculatorService ]
        });

        const calculatorService = TestBed.get(CalculatorService);
        expect(calculatorService.add(2, 3)).toBe(5);
    });
});
