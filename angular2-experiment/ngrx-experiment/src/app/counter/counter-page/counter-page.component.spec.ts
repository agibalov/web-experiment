import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CounterPageComponent } from './counter-page.component';
import { counterFeatureKey, CounterFeatureState, selectCount } from '../counter.reducer';
import { By } from '@angular/platform-browser';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { decrement, increment } from '../counter.actions';
import { buffer } from 'rxjs/operators';
import { Subject } from 'rxjs';

describe('CounterPageComponent', () => {
  let fixture: ComponentFixture<CounterPageComponent>;
  let mockStore: MockStore<CounterFeatureState>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideMockStore<CounterFeatureState>({
          initialState: {
            [counterFeatureKey]: {
              count: 0
            }
          }
        })
      ],
      declarations: [ CounterPageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CounterPageComponent);
    mockStore = TestBed.get(MockStore);
    fixture.detectChanges();
  });

  afterEach(() => {
    // https://ngrx.io/guide/store/testing
    // Note: MockStore will reset all of the mocked selectors after each test (in the afterEach() hook)
    // by calling the MockStore.resetSelectors() method.
    // TODO: WTF? Is this supposed to happen automatically?
    mockStore.resetSelectors();
  });

  describe('using overrideSelector()', () => {
    it('can make it say 123', () => {
      mockStore.overrideSelector(selectCount, 123);
      mockStore.refreshState();
      fixture.detectChanges();
      expect(fixture.debugElement.query(By.css('h2')).nativeElement.textContent).toBe('Count: 123');
    });

    it('can make it say 111 and then 222', () => {
      const mockCounterSelector = mockStore.overrideSelector(selectCount, 111);
      mockStore.refreshState();
      fixture.detectChanges();
      expect(fixture.debugElement.query(By.css('h2')).nativeElement.textContent).toBe('Count: 111');

      mockCounterSelector.setResult(222);
      mockStore.refreshState();
      fixture.detectChanges();
      expect(fixture.debugElement.query(By.css('h2')).nativeElement.textContent).toBe('Count: 222');
    });
  });

  describe('using setState()', () => {
    it('can make it say 123', () => {
      mockStore.setState({
        [counterFeatureKey]: {
          count: 123
        }
      });
      fixture.detectChanges();

      expect(fixture.debugElement.query(By.css('h2')).nativeElement.textContent).toBe('Count: 123');
    });

    it('can make it say 123 and then 234', () => {
      mockStore.setState({
        [counterFeatureKey]: {
          count: 123
        }
      });
      fixture.detectChanges();
      expect(fixture.debugElement.query(By.css('h2')).nativeElement.textContent).toBe('Count: 123');

      mockStore.setState({
        [counterFeatureKey]: {
          count: 234
        }
      });
      fixture.detectChanges();
      expect(fixture.debugElement.query(By.css('h2')).nativeElement.textContent).toBe('Count: 234');
    });
  });

  describe('buttons', () => {
    it('increment should work', done => {
      const stopSubject = new Subject();
      mockStore.scannedActions$.pipe(buffer(stopSubject)).subscribe(actions => {
        expect(actions.find(a => a.type === increment.type)).toBeDefined();
        done();
      });

      fixture.debugElement.query(By.css('button.increment')).nativeElement.click();

      stopSubject.next();
    });

    it('decrement should work', done => {
      const stopSubject = new Subject();
      mockStore.scannedActions$.pipe(buffer(stopSubject)).subscribe(actions => {
        expect(actions.find(a => a.type === decrement.type)).toBeDefined();
        done();
      });

      fixture.debugElement.query(By.css('button.decrement')).nativeElement.click();

      stopSubject.next();
    });
  });
});
