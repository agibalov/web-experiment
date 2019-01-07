import * as React from 'react'
import { render } from 'react-dom'
import { createStore, applyMiddleware } from 'redux'
import { connect, Provider } from "react-redux"
import Dispatch = Redux.Dispatch

interface AppStateProps {
    count: number
}

interface AppDispatchProps {
    increment: { (): void }
    decrement: { (): void }
}

interface AppProps extends AppStateProps, AppDispatchProps {
}

class App extends React.Component<AppProps, any> {
    render() {
        const count = this.props.count;
        return <div>
            <h1>Hello World</h1>
            <p>{count}</p>
            <button type="button" onClick={this.props.increment}>Increment</button>
            <button type="button" onClick={this.props.decrement}>Decrement</button>
        </div>;
    }
}

// connect()() doesn't know anything about StatelessComponents so far...
/*
const App: React.StatelessComponent<AppProps> = (props: AppProps) => {
    const count = props.count;
    return <div>
        <h1>Hello World</h1>
        <p>{count}</p>
        <button type="button" onClick={props.increment}>Increment</button>
        <button type="button" onClick={props.decrement}>Decrement</button>
    </div>;
}
*/

function mapStateToProps(state: AppState): AppStateProps {
    return {
        count: state.counterValue
    }
}

function mapDispatchToProps(dispatch: Dispatch): AppDispatchProps {
    return {
        increment: ():void => {
            dispatch(increaseCounter());
        },
        decrement: ():void => {
            dispatch(decreaseCounter());
        }
    }
}

const ConnectedApp = connect(mapStateToProps, mapDispatchToProps)(App);

interface AppState {
    counterValue: number
}

interface Action {
    type: string
}

function increaseCounter(): Action {
    return {
        type: 'INCREASE'
    }
}

function decreaseCounter(): Action {
    return {
        type: 'DECREASE'
    }
}

function appReducer(state: AppState, action: Action): AppState {
    if(action.type === 'INCREASE') {
        return {
            counterValue: state.counterValue + 1
        };
    } else if(action.type === 'DECREASE') {
        return {
            counterValue: state.counterValue - 1
        }
    } else {
        return state
    }
}

import * as reduxLoggerMiddleware from 'redux-logger'

const store = createStore(appReducer, { counterValue: 5 }, applyMiddleware(reduxLoggerMiddleware()));

render(
    <Provider store={store}>
        <ConnectedApp />
    </Provider>,
    document.getElementById('root'));
