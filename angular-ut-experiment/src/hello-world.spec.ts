import {TestBed, inject} from "@angular/core/testing";
import {BrowserDynamicTestingModule, platformBrowserDynamicTesting} from '@angular/platform-browser-dynamic/testing';

describe('Static TestBed with get() method', () => {
    it('should work', () => {
        TestBed.configureTestingModule({
            providers: [ { provide: 'Something', useValue: 'hello' } ]
        });

        const something = TestBed.get('Something');
        expect(something).toBe('hello');
    });
});

describe('Static TestBed with inject() method', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [ { provide: 'Something', useValue: 'hello' } ]
        });
    });

    it('should work', inject(['Something'], (something: string) => {
        expect(something).toBe('hello');
    }));
});

describe('TestBed instance with get() method', () => {
    it('should work', () => {
        const testBed = new TestBed();
        testBed.initTestEnvironment(BrowserDynamicTestingModule, platformBrowserDynamicTesting());

        testBed.configureTestingModule({
            providers: [ { provide: 'Something', useValue: 'hello' } ]
        });

        const something = testBed.get('Something');
        expect(something).toBe('hello');
    });
});
