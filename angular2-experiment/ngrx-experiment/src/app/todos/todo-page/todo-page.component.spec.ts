import { ComponentFixture, TestBed } from '@angular/core/testing';

import { selectTodoIdRouteParam, TodoPageComponent } from './todo-page.component';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { By } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { StoreRouterConnectingModule } from '@ngrx/router-store';
import { RouterTestingModule } from '@angular/router/testing';
import { routerFeatureKey } from '../../router.reducer';

describe('TodoPageComponent', () => {
  let fixture: ComponentFixture<TodoPageComponent>;
  let mockStore: MockStore;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        StoreRouterConnectingModule.forRoot()
      ],
      providers: [
        provideMockStore({
          initialState: {
            [routerFeatureKey]: {}
          }
        })
      ],
      declarations: [ TodoPageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TodoPageComponent);
    mockStore = TestBed.get(MockStore);
    fixture.detectChanges();
  });

  afterEach(() => {
    mockStore.resetSelectors();
  });

  it('should work', () => {
    mockStore.overrideSelector(selectTodoIdRouteParam, 'xxx');
    mockStore.refreshState();
    fixture.detectChanges();
    expect(fixture.debugElement.query(By.css('h2')).nativeElement.textContent).toBe('Todo ID is xxx');
  });
});
