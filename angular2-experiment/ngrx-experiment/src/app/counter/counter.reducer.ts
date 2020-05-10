import { createFeatureSelector, createReducer, createSelector, on } from '@ngrx/store';
import { decrement, increment, reset, set } from './counter.actions';

export const counterFeatureKey = 'CounterFeature';

export interface CounterState {
  count: number;
}

export interface CounterFeatureState {
  [counterFeatureKey]: CounterState;
}

const underscoreCounterReducer = createReducer<CounterState>(
  {
    count: 0
  },
  on(increment, state => ({ count: state.count + 1 })),
  on(decrement, state => ({ count: state.count - 1 })),
  on(reset, state => ({ count: 0 })),
  on(set, (state, payload) => ({ count: payload.value }))
);

export function counterReducer(state, action) {
  return underscoreCounterReducer(state, action);
}

export const selectCounterState = createFeatureSelector<CounterState>(counterFeatureKey);

export const selectCount = createSelector(selectCounterState, state => state.count);
