import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { select, Store } from '@ngrx/store';
import { AddTodo, DeleteTodo, selectAllTodos, selectTodosCount, Todo, TodosState } from './todo';

interface AppState {
  todos: TodosState;
}

@Component({
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.scss']
})
export class TodoComponent {
  lastId = 0;
  state$: Observable<any>;
  todos$: Observable<Todo[]>;
  todosCount$: Observable<number>;

  constructor(private store: Store<AppState>) {
    this.state$ = store.pipe(select(state => state.todos));
    this.todos$ = store.pipe(select(selectAllTodos));
    this.todosCount$ = store.pipe(select(selectTodosCount));
  }

  add() {
    this.store.dispatch(new AddTodo({
      todo: {
        id: `${++this.lastId}`,
        text: `Todo #${this.lastId}`
      }
    }));
  }

  delete(todoId: string) {
    this.store.dispatch(new DeleteTodo({
      todoId: todoId
    }));
  }
}
