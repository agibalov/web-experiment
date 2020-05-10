import { Component } from '@angular/core';
import { createSelector, select, Store } from '@ngrx/store';
import { State } from '../../reducers';
import { Observable } from 'rxjs';
import { selectRouteParam } from 'src/app/router.reducer';

export const selectTodoIdRouteParam = createSelector(selectRouteParam('todoId'), todoId => todoId);

@Component({
  selector: 'app-todo-page',
  templateUrl: './todo-page.component.html',
  styleUrls: ['./todo-page.component.scss']
})
export class TodoPageComponent {
  readonly todoId$: Observable<string> = this.store.pipe(select(selectTodoIdRouteParam));

  constructor(private readonly store: Store<State>) {
  }
}
