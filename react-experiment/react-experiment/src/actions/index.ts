export const INCREMENT_ACTION = 'INCREMENT';
export const DECREMENT_ACTION = 'DECREMENT';
export const SET_ACTION = 'SET';

export const increment = () => ({
    type: INCREMENT_ACTION
});

export const decrement = () => ({
    type: DECREMENT_ACTION
});

export const set = (value: number) => ({
    type: SET_ACTION,
    value
});
