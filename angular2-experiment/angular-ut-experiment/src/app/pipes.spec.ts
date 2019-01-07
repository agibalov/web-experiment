import {Component, Pipe, PipeTransform} from "@angular/core";
import {async, TestBed} from '@angular/core/testing';

describe('Pipes', () => {
  describe('UpperCasePipe', () => {
    @Component({
      selector: 'dummy',
      template: '<h1>{{message | uppercase}}</h1>'
    })
    class DummyComponent {
      message: string;
    }

    it('should work', async(() => {
      TestBed.configureTestingModule({
        declarations: [ DummyComponent ]
      });

      const fixture = TestBed.createComponent(DummyComponent);
      const componentInstance = fixture.componentInstance;
      const compiled = fixture.debugElement.nativeElement;
      const h1Element = compiled.querySelector('h1');

      componentInstance.message = 'hello there';
      fixture.detectChanges();
      expect(h1Element.textContent).toBe('HELLO THERE');
    }));
  });

  describe('MyUpperCasePipe', () => {
    @Pipe({ name: 'myUpperCase' })
    class MyUpperCasePipe implements PipeTransform {
      transform(value: string): any {
        return value.toUpperCase();
      }
    }

    @Component({
      selector: 'dummy',
      template: '<h1>{{message | myUpperCase}}</h1>'
    })
    class DummyComponent {
      message: string;
    }

    it('should work', async(() => {
      TestBed.configureTestingModule({
        declarations: [
          DummyComponent,
          MyUpperCasePipe
        ]
      });

      const fixture = TestBed.createComponent(DummyComponent);
      const componentInstance = fixture.componentInstance;
      const compiled = fixture.debugElement.nativeElement;
      const h1Element = compiled.querySelector('h1');

      componentInstance.message = 'hello there';
      fixture.detectChanges();
      expect(h1Element.textContent).toBe('HELLO THERE');
    }));
  });
});
