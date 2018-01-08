import {TestBed, async} from '@angular/core/testing';
import {Component, OnDestroy, OnInit} from '@angular/core';

describe('DummyComponent', () => {
  @Component({
    selector: 'dummy',
    template: `<div>hello {{who}}</div>`
  })
  class DummyComponent {
    who = 'world';
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

describe('Lifecycle', () => {
  @Component({
    selector: 'dummy',
    template: `hello`
  })
  class DummyComponent implements OnInit, OnDestroy {
    public log: string[];

    ngOnInit(): void {
      if(this.log != null) {
        this.log.push('onInit()');
      }
    }

    ngOnDestroy(): void {
      if(this.log != null) {
        this.log.push('onDestroy()');
      }
    }
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
    const dummyComponent = fixture.debugElement.componentInstance;
    const log: string[] = [];
    dummyComponent.log = log;

    log.push('before onInit()');
    fixture.detectChanges();
    log.push('after onInit()');
    log.push('before onDestroy()')
    fixture.destroy();
    log.push('after onDestroy()');

    expect(log).toEqual([
      'before onInit()',
      'onInit()',
      'after onInit()',
      'before onDestroy()',
      'onDestroy()',
      'after onDestroy()'
    ]);
  }));
});
