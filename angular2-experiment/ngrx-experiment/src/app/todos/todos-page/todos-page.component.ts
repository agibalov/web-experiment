import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { State } from '../../reducers';
import { Observable } from 'rxjs';
import { selectAllTodos, selectTotalTodos, Todo } from '../todos.reducer';
import { loadTodos, deleteTodo, clearTodos, addTodo } from '../todos.actions';

@Component({
  selector: 'app-todos-page',
  templateUrl: './todos-page.component.html',
  styleUrls: ['./todos-page.component.scss']
})
export class TodosPageComponent implements OnInit {
  readonly todos$: Observable<Todo[]> = this.store.pipe(select(selectAllTodos));
  readonly todoCount$: Observable<number> = this.store.pipe(select(selectTotalTodos));

  constructor(private readonly store: Store<State>) {
  }

  ngOnInit(): void {
    this.store.dispatch(loadTodos({
      todos: [
        { id: '1', text: 'Todo One' },
        { id: '2', text: 'Todo Two' },
        { id: '3', text: 'Todo Three' }
      ]
    }));
  }

  addTodo() {
    const id = new Date().toISOString();
    this.store.dispatch(addTodo({
      id,
      text: `Todo with ID ${id}`
    }));
  }

  deleteTodo(todoId: string) {
    this.store.dispatch(deleteTodo({ todoId }));
  }

  deleteAllTodos() {
    this.store.dispatch(clearTodos());
  }
}
