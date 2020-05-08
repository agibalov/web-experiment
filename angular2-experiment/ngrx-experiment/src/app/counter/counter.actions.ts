import { createAction, props, union } from '@ngrx/store';

export const increment = createAction('[Counter] Increment');
export const decrement = createAction('[Counter] Decrement');
export const reset = createAction('[Counter] Reset');

export interface SetCounterValuePayload {
  value: number;
}

export const set = createAction('[Counter] Set Value', props<SetCounterValuePayload>());

export const jump = createAction('[Counter] Jump');
