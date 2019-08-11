import * as React from "react";
import * as ReactDOM from "react-dom";

import { TodoAppComponent } from './TodoAppComponent';
import { configure } from 'mobx';
import { Store } from './Store';

configure({
    enforceActions: 'always'
});

const store = new Store();

ReactDOM.render(
    <TodoAppComponent store={store} />,
    document.getElementById("example")
);
