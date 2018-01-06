import {TestBed, async} from '@angular/core/testing';
import {Component} from '@angular/core';

@Component({
  selector: 'dummy',
  template: `<div>hello {{who}}</div>`
})
export class DummyComponent {
  who = 'world';
}

describe('DummyComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        DummyComponent
      ],
    }).compileComponents();
  }));

  it('should work', async(() => {
    const fixture = TestBed.createComponent(DummyComponent);
    fixture.detectChanges();

    const dummyComponent = fixture.debugElement.componentInstance;
    expect(dummyComponent.who).toEqual('world');

    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('div').textContent).toBe('hello world');

    dummyComponent.who = 'you';
    expect(compiled.querySelector('div').textContent).toBe('hello world');

    fixture.detectChanges();
    expect(compiled.querySelector('div').textContent).toBe('hello you');
  }));
});
