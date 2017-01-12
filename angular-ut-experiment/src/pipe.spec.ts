import {Component} from "@angular/core";
import {TestBed} from "@angular/core/testing";
import {By} from "@angular/platform-browser";

@Component({
    selector: 'dummy',
    template: '<h1>{{message | uppercase}}</h1>'
})
class DummyComponent {
    message: string;
}

describe('UpperCasePipe', () => {
    it('should work', () => {
        TestBed.configureTestingModule({
            declarations: [ DummyComponent ]
        });

        const fixture = TestBed.createComponent(DummyComponent);
        const componentInstance = fixture.componentInstance;
        const h1Element = fixture.debugElement.query(By.css('h1')).nativeElement;

        componentInstance.message = 'hello there';
        fixture.detectChanges();
        expect(h1Element.textContent).toBe('HELLO THERE');
    });
});
