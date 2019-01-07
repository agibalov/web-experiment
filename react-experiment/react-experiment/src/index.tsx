import '../node_modules/bulma/css/bulma.css';

import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import { rootReducer } from './reducers';
import { AppContainer } from './containers/App';

const store = createStore(rootReducer);

ReactDOM.render(
    <Provider store={store}>
        <AppContainer />
    </Provider>,
    document.querySelector('#app'));
