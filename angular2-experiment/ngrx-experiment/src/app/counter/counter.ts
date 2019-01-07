import { Action } from '@ngrx/store';

export enum CounterActionTypes {
  INCREMENT = 'INCREMENT',
  DECREMENT = 'DECREMENT',
  RESET = 'RESET',
  SET = 'SET'
}

export class Increment implements Action {
  readonly type = CounterActionTypes.INCREMENT;
}

export class Decrement implements Action {
  readonly type = CounterActionTypes.DECREMENT;
}

export class Reset implements Action {
  readonly type = CounterActionTypes.RESET;
}

export class Set implements Action {
  readonly type = CounterActionTypes.SET;
  constructor(public value: number) {}
}

export type CounterActionsUnion = Increment | Decrement | Reset | Set;

const initialState = 0;

export function counterReducer(state: number = initialState, action: CounterActionsUnion): number {
  switch (action.type) {
    case CounterActionTypes.INCREMENT:
      return state + 1;

    case CounterActionTypes.DECREMENT:
      return state - 1;

    case CounterActionTypes.RESET:
      return initialState;

    case CounterActionTypes.SET:
      return action.value;

    default:
      return state;
  }
}
