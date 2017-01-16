import {Component} from "@angular/core";
import {TestBed} from "@angular/core/testing";
import {By} from "@angular/platform-browser";

describe('NgIf', () => {
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

describe('NgFor', () => {
    @Component({
        selector: 'dummy',
        template: `
<h1 *ngFor="let item of items">{{item}}</h1>
`
    })
    class DummyComponent {
        items: string[];
    }

    it('should work', () => {
        TestBed.configureTestingModule({
            declarations: [ DummyComponent ]
        });

        const fixture = TestBed.createComponent(DummyComponent);
        const componentInstance = fixture.componentInstance;
        const debugElement = fixture.debugElement;

        componentInstance.items = ['one', 'two', 'three'];
        fixture.detectChanges();
        expect(debugElement.queryAll(By.css('h1')).length).toBe(3);
    });
});
