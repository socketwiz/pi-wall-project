
import Bus from './components/bus';
import configureStore from './store/configureStore';
import {hashHistory, Router, Route} from 'react-router';
import {Provider} from 'react-redux';
import React from 'react';
import {render} from 'react-dom';
import Weather from './containers/Weather';

import '../sass/main.scss';

const store = configureStore();

render(
    <Provider store={store}>
        <Router history={hashHistory}>
            <Route path="/" component={Weather} />
            <Route path='/bus' component={Bus} />
        </Router>
    </Provider>,
    document.getElementById('app')
);

