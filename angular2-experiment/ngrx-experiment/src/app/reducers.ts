import { counterFeatureKey, CounterState } from './counter/counter.reducer';
import { todosFeatureKey, TodosState } from './todos/todos.reducer';
import { routerFeatureKey } from './router.reducer';
import { RouterReducerState } from '@ngrx/router-store';

export interface State {
  [counterFeatureKey]: CounterState;
  [todosFeatureKey]: TodosState;
  [routerFeatureKey]: RouterReducerState<any>;
}
