import {TestBed, async} from '@angular/core/testing';
import {Component, Inject, Input, OnChanges, OnDestroy, OnInit, SimpleChanges} from '@angular/core';

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

describe('Input properties', () => {
  @Component({
    selector: 'person',
    template: `first={{first}}`
  })
  class PersonComponent implements OnChanges {
    @Input() first: string;

    constructor(@Inject('changeLog') private changeLog: SimpleChanges[]) {
    }

    ngOnChanges(changes: SimpleChanges): void {
      this.changeLog.push(changes);
    }
  }

  @Component({
    template: `<person [first]="firstName"></person>`
  })
  class HostComponent {
    firstName: string;
  }

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        HostComponent,
        PersonComponent
      ],
      providers: [
        { provide: 'changeLog', useValue: [] }
      ],
    }).compileComponents();
  }));

  it('should work', async(() => {
    const fixture = TestBed.createComponent(HostComponent);
    const hostComponent = fixture.debugElement.componentInstance;
    const compiled = fixture.debugElement.nativeElement;

    hostComponent.firstName = 'John';
    expect(compiled.textContent).toBe('first=');

    fixture.detectChanges();
    expect(compiled.textContent).toBe('first=John');

    const changeLog: SimpleChanges[] = TestBed.get('changeLog');
    expect(changeLog.length).toBe(1);
    expect(changeLog[0].first.previousValue).toBeUndefined();
    expect(changeLog[0].first.currentValue).toBe('John');
    expect(changeLog[0].first.firstChange).toBe(true);
  }));
});
