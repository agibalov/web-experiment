import {Component} from "@angular/core";
import {TestBed} from "@angular/core/testing";
import {By} from "@angular/platform-browser";

@Component({
    selector: 'dummy',
    template: `
<h1 *ngIf="show">hello</h1>
<h2 *ngIf="!show">world</h2>
`
})
class DummyComponent {
    show: boolean;
}

describe('UpperCasePipe', () => {
    it('should work', () => {
        TestBed.configureTestingModule({
            declarations: [ DummyComponent ]
        });

        const fixture = TestBed.createComponent(DummyComponent);
        const componentInstance = fixture.componentInstance;
        const debugElement = fixture.debugElement;

        componentInstance.show = true;
        fixture.detectChanges();
        expect(debugElement.query(By.css('h1'))).not.toBeNull();
        expect(debugElement.query(By.css('h2'))).toBeNull();

        componentInstance.show = false;
        fixture.detectChanges();
        expect(debugElement.query(By.css('h1'))).toBeNull();
        expect(debugElement.query(By.css('h2'))).not.toBeNull();
    });
});
