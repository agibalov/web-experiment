import { createAction, props } from '@ngrx/store';
import { Todo } from './todos.reducer';

export const loadTodos = createAction('[Todos] Load', props<{ todos: Todo[] }>());
export const addTodo = createAction('[Todos] Add', props<{ id: string, text: string }>());
export const deleteTodo = createAction('[Todos] Delete', props<{ todoId: string }>());
export const clearTodos = createAction('[Todos] Clear');
