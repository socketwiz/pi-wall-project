import {createStore} from 'redux';
import {Provider} from 'react-redux';
import React from 'react';
import ReactDOM from 'react-dom';
import rootReducer from './reducers/index';
import Weather from './containers/weather.js';

const store = createStore(rootReducer);

ReactDOM.render(
        <Provider store={store}>
        <Weather />
        </Provider>,
    document.getElementById('root')
);
