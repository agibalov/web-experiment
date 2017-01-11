import {Component} from "@angular/core";
import {TestBed} from "@angular/core/testing";
import {By} from "@angular/platform-browser";

@Component({
    selector: 'dummy',
    template: '<h1>{{message}}</h1>'
})
class DummyComponent {
    message = 'hello world!'
}

describe('DummyComponent', () => {
    it('should work', () => {
        TestBed.configureTestingModule({
            declarations: [ DummyComponent ]
        });

        const fixture = TestBed.createComponent(DummyComponent);
        const componentInstance = fixture.componentInstance;
        expect(componentInstance.message).toBe('hello world!');

        const debugElement = fixture.debugElement;
        const h1Element = debugElement.query(By.css('h1')).nativeElement;

        expect(h1Element.textContent).toBe('');
        fixture.detectChanges();
        expect(h1Element.textContent).toBe('hello world!');
    });
});
