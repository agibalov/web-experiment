import { DECREMENT_ACTION, INCREMENT_ACTION, SET_ACTION } from '../actions';

export interface AppState {
    count: number;
}

export function rootReducer(state: AppState = {
    count: 0
}, action: any): AppState {
    switch(action.type) {
        case INCREMENT_ACTION:
            return {
                ...state,
                count: state.count + 1
            };
        case DECREMENT_ACTION:
            return {
                ...state,
                count: state.count - 1
            };
        case SET_ACTION:
            return {
                ...state,
                count: action.value
            };
        default:
            return state;
    }
}
