import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CounterPageComponent } from './counter-page.component';

describe('CounterPageComponent', () => {
  let component: CounterPageComponent;
  let fixture: ComponentFixture<CounterPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CounterPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CounterPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
