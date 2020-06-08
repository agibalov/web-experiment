import { Component, Injectable, OnDestroy } from '@angular/core';
import { Action, Selector, State, StateContext, Store } from '@ngxs/store';
import { Subscription } from 'rxjs';
import { RouterState, RouterStateModel } from '@ngxs/router-plugin';

export class LoadTodo {
  static readonly type = '[Todo Page] Load Todo';
  constructor(public todoId: string, public isExtended: boolean) {
  }
}

export interface TodoPageStateModel {
  isLoading: boolean;
  todoId: string|null;
  todoText: string|null;
}

@State<TodoPageStateModel>({
  name: 'todoPage',
  defaults: {
    isLoading: false,
    todoId: null,
    todoText: null
  }
})
@Injectable()
export class TodoPageState {
  @Action(LoadTodo)
  async loadTodo(ctx: StateContext<TodoPageStateModel>, action: LoadTodo) {
    ctx.patchState({
      isLoading: true,
      todoId: null,
      todoText: null
    });
    try {
      await new Promise(resolve => setTimeout(resolve, 500));
      ctx.patchState({
        todoId: action.todoId,
        todoText: `Text of todo ${action.todoId}`
      });
    } finally {
      ctx.patchState({ isLoading: false });
    }
  }
}

export interface TodoRouteModel {
  todoId: string;
  isExtended: boolean;
}

@Component({
  selector: 'app-todo-page',
  templateUrl: './todo-page.component.html',
  styleUrls: ['./todo-page.component.scss']
})
export class TodoPageComponent implements OnDestroy {
  readonly state$ = this.store.select(state => state.router);
  readonly todoState$ = this.store.select(state => state.todoPage);
  readonly subscription: Subscription;

  @Selector([RouterState])
  private static todoRouteParams(state: RouterStateModel): TodoRouteModel {
    const firstChild = state.state.root.firstChild;
    const todoId = firstChild.params.id;
    const isExtended = firstChild.queryParams.extended === '1';
    return { todoId, isExtended };
  }

  constructor(private readonly store: Store) {
    this.subscription = store
      .select(TodoPageComponent.todoRouteParams)
      .subscribe(todoRouteParams => {
        store.dispatch(new LoadTodo(todoRouteParams.todoId, todoRouteParams.isExtended));
      });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
