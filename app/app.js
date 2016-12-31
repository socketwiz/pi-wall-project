
import configureStore from './store/configureStore';
import {hashHistory, Router} from 'react-router';
import {Provider} from 'react-redux';
import React from 'react';
import {render} from 'react-dom';
import routes from './routes';

import '../sass/main.scss';

const store = configureStore();

render(
    <Provider store={store}>
        <Router history={hashHistory} routes={routes}></Router>
    </Provider>,
    document.getElementById('app')
);

