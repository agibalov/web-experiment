import {TestBed, async} from '@angular/core/testing';
import {Component} from '@angular/core';

describe('Directives', () => {
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

    beforeEach(async(() => {
      TestBed.configureTestingModule({
        declarations: [
          DummyComponent
        ],
      }).compileComponents();
    }));

    it('should work', async(() => {
      const fixture = TestBed.createComponent(DummyComponent);
      const componentInstance = fixture.componentInstance;
      const debugElement = fixture.debugElement;
      const compiled = debugElement.nativeElement;

      componentInstance.show = true;
      fixture.detectChanges();
      expect(compiled.querySelector('h1')).not.toBeNull();
      expect(compiled.querySelector('h2')).toBeNull();

      componentInstance.show = false;
      fixture.detectChanges();
      expect(compiled.querySelector('h1')).toBeNull();
      expect(compiled.querySelector('h2')).not.toBeNull();
    }));
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

    beforeEach(async(() => {
      TestBed.configureTestingModule({
        declarations: [
          DummyComponent
        ],
      }).compileComponents();
    }));

    it('should work', async(() => {
      TestBed.configureTestingModule({
        declarations: [ DummyComponent ]
      });

      const fixture = TestBed.createComponent(DummyComponent);
      const componentInstance = fixture.componentInstance;
      const debugElement = fixture.debugElement;
      const compiled = debugElement.nativeElement;

      componentInstance.items = ['one', 'two', 'three'];
      fixture.detectChanges();
      expect(compiled.querySelectorAll('h1').length).toBe(3);
    }));
  });
});
