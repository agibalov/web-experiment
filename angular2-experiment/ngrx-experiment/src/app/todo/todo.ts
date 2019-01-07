import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { Action, createFeatureSelector, createSelector } from '@ngrx/store';

export enum TodoActionTypes {
  ADD_TODO = 'ADD_TODO',
  UPDATE_TODO = 'UPDATE_TODO',
  DELETE_TODO = 'DELETE_TODO',
  CLEAR_TODOS = 'CLEAR_TODOS'
}

export class AddTodo implements Action {
  readonly type = TodoActionTypes.ADD_TODO;
  constructor(public payload: {
    todo: Todo
  }) {}
}

export class UpdateTodo implements Action {
  readonly type = TodoActionTypes.UPDATE_TODO;
  constructor(public payload: {
    todo: Todo
  }) {}
}

export class DeleteTodo implements Action {
  readonly type = TodoActionTypes.DELETE_TODO;
  constructor(public payload: {
    todoId: string
  }) {}
}

export class ClearTodos implements Action {
  readonly type = TodoActionTypes.CLEAR_TODOS;
}

export type TodoActionsUnion = AddTodo | UpdateTodo | DeleteTodo | ClearTodos;

export interface Todo {
  id: string;
  text: string;
}

export interface TodosState extends EntityState<Todo> {
}

export const adapter: EntityAdapter<Todo> = createEntityAdapter<Todo>();

const initialState = adapter.getInitialState();

export function reducer(state = initialState, action: TodoActionsUnion) {
  switch (action.type) {
    case TodoActionTypes.ADD_TODO:
      return adapter.addOne(action.payload.todo, state);
    case TodoActionTypes.UPDATE_TODO:
      return adapter.updateOne({
        id: action.payload.todo.id,
        changes: {
          text: action.payload.todo.text
        }
      }, state);
    case TodoActionTypes.DELETE_TODO:
      return adapter.removeOne(action.payload.todoId, state);
    case TodoActionTypes.CLEAR_TODOS:
      return adapter.removeAll(state);
    default:
      return state;
  }
}

const selectTodosState = createFeatureSelector<TodosState>('todos');
const selectors = adapter.getSelectors();

export const selectAllTodos = createSelector(
  selectTodosState,
  selectors.selectAll
);

export const selectTodosCount = createSelector(
  selectTodosState,
  selectors.selectTotal
);
