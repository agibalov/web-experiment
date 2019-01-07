import { CounterVisualizer } from '../components/CounterVisualizer';
import { CounterDriver } from '../components/CounterDriver';
import { decrement, increment, set } from '../actions';
import * as React from 'react';
import { connect } from 'react-redux';
import { AppState } from '../reducers';
import { Dispatch } from 'redux';

const App = (props: {
    count?: number;
    increment?: () => void;
    decrement?: () => void;
    set?: (value: number) => void
}) =>
    <div>
        <section className="hero is-primary">
            <div className="hero-body">
                <div className="container">
                    <h1 className="title">
                        Hello React
                    </h1>
                    <h2 className="subtitle">
                        The Counter {props.count}
                    </h2>
                </div>
            </div>
        </section>
        <div className='container'>
            <CounterVisualizer value={props.count} />
            <CounterDriver
                onIncrement={() => {
                    props.increment();
                }}
                onDecrement={() => {
                    props.decrement();
                }}
                onSetTo123={() => {
                    props.set(123);
                }}
            ></CounterDriver>
        </div>
    </div>;

export const AppContainer = connect(
    (state: AppState) => ({
        count: state.count
    }),
    (dispatch: Dispatch<any>) => ({
        increment: () => dispatch(increment()),
        decrement: () => dispatch(decrement()),
        set: (value: number) => dispatch(set(value))
    })
)(App);
