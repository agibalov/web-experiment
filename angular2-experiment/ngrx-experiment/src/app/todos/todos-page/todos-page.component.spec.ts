import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TodosPageComponent } from './todos-page.component';
import { RouterTestingModule } from '@angular/router/testing';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { todosFeatureKey, TodosFeatureState } from '../todos.reducer';
import { By } from '@angular/platform-browser';

describe('TodosPageComponent', () => {
  let fixture: ComponentFixture<TodosPageComponent>;
  let mockStore: MockStore<TodosFeatureState>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideMockStore<TodosFeatureState>({
          initialState: {
            [todosFeatureKey]: {
              selectedTodoId: 'todo1',
              ids: ['todo1', 'todo2'],
              entities: {
                todo1: { id: 'todo1', text: 'Todo One' },
                todo2: { id: 'todo2', text: 'Todo Two' }
              }
            }
          }
        })
      ],
      declarations: [ TodosPageComponent ],
      imports: [ RouterTestingModule ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TodosPageComponent);
    mockStore = TestBed.get(MockStore);
    fixture.detectChanges();
  });

  it('should work', () => {
    expect(fixture.debugElement.query(By.css('h2')).nativeElement.textContent).toBe('Todo count: 2');
  });
});
