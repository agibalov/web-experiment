import * as React from 'react';

export const CounterDriver = (props: {
    onIncrement: () => void;
    onDecrement: () => void;
    onSetTo123: () => void;
}) =>
    <div className="buttons">
        <button type="button" className="button" onClick={ props.onDecrement }>Decrement</button>
        <button type="button" className="button" onClick={ props.onIncrement }>Increment</button>
        <button type="button" className="button" onClick={ props.onSetTo123 }>Set to 123</button>
    </div>
