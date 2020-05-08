import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { createFeatureSelector, createReducer, createSelector, on } from '@ngrx/store';
import { addTodo, clearTodos, deleteTodo, loadTodos } from './todos.actions';

export const todosFeatureKey = 'TodosFeature';

export interface Todo {
  id: string;
  text: string;
}

export interface TodosState extends EntityState<Todo> {
  selectedTodoId: string|null;
}

export function selectTodoId(todo: Todo): string {
  return todo.id;
}

export const adapter: EntityAdapter<Todo> = createEntityAdapter<Todo>({
  selectId: selectTodoId
});

const initialState = adapter.getInitialState({
  selectedTodoId: null
});

export const todosReducer = createReducer<TodosState>(
  initialState,
  on(loadTodos, (state, payload) => {
    return adapter.setAll(payload.todos, state);
  }),
  on(addTodo, (state, payload) => {
    return adapter.addOne({
      id: payload.id,
      text: payload.text
    }, state);
  }),
  on(deleteTodo, (state, payload) => {
    return adapter.removeOne(payload.todoId, state);
  }),
  on(clearTodos, (state, payload) => {
    return adapter.removeAll(state);
  })
);

export const selectTodosState = createFeatureSelector<TodosState>(todosFeatureKey);

const { selectAll, selectTotal } = adapter.getSelectors();

export const selectAllTodos = createSelector(selectTodosState, selectAll);
export const selectTotalTodos = createSelector(selectTodosState, selectTotal);
