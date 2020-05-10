import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CounterPageComponent } from './counter-page.component';
import { Store, StoreModule } from '@ngrx/store';
import { counterFeatureKey, CounterFeatureState, counterReducer, CounterState } from '../counter.reducer';
import { By } from '@angular/platform-browser';
import { EffectsModule } from '@ngrx/effects';
import { CounterEffects } from '../counter.effects';
import { RandomService } from '../random.service';

describe('CounterPageComponent integration', () => {
  let fixture: ComponentFixture<CounterPageComponent>;
  let store: Store<CounterFeatureState>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ CounterPageComponent ],
      imports: [
        StoreModule.forRoot<{[counterFeatureKey]: CounterState}>({
          [counterFeatureKey]: counterReducer
        }, {
          initialState: {
            [counterFeatureKey]: {
              count: 10
            }
          }
        }),
        EffectsModule.forRoot([CounterEffects])
      ],
      providers: [
        RandomService
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CounterPageComponent);
    store = TestBed.get(Store);
    fixture.detectChanges();
  });

  it('defaults to 10', () => {
    expect(fixture.debugElement.query(By.css('h2')).nativeElement.textContent).toBe('Count: 10');
  });

  it('handles increment', () => {
    fixture.debugElement.query(By.css('button.increment')).nativeElement.click();
    fixture.detectChanges();
    expect(fixture.debugElement.query(By.css('h2')).nativeElement.textContent).toBe('Count: 11');
  });

  it('handles reset', () => {
    fixture.debugElement.query(By.css('button.reset')).nativeElement.click();
    fixture.detectChanges();
    expect(fixture.debugElement.query(By.css('h2')).nativeElement.textContent).toBe('Count: 0');
  });

  it('handles decrement', () => {
    fixture.debugElement.query(By.css('button.decrement')).nativeElement.click();
    fixture.detectChanges();
    expect(fixture.debugElement.query(By.css('h2')).nativeElement.textContent).toBe('Count: 9');
  });

  it('handles set100', () => {
    fixture.debugElement.query(By.css('button.set100')).nativeElement.click();
    fixture.detectChanges();
    expect(fixture.debugElement.query(By.css('h2')).nativeElement.textContent).toBe('Count: 100');
  });

  it('handles set9000', () => {
    fixture.debugElement.query(By.css('button.set9000')).nativeElement.click();
    fixture.detectChanges();
    expect(fixture.debugElement.query(By.css('h2')).nativeElement.textContent).toBe('Count: 9000');
  });

  xit('handles jump', () => {
    fixture.debugElement.query(By.css('button.jump')).nativeElement.click();
    fixture.detectChanges();
    // TODO: Store doesn't have scannedActions$, so I can't simply subscribe and listen
    // TODO: add a meta reducer that collects all actions?
  });
});
