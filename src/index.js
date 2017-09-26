
import 'bootstrap/dist/css/bootstrap.min.css';
import 'weather-icons/css/weather-icons.min.css';
import './index.css';

import {BrowserRouter, Route, Switch} from 'react-router-dom';
import Bus from './components/bus';
import {createStore} from 'redux';
import {Provider} from 'react-redux';
import React from 'react';
import ReactDOM from 'react-dom';
import rootReducer from './reducers/index';
import Weather from './containers/weather';

const store = createStore(rootReducer);

ReactDOM.render(
    <Provider store={store}>
        <BrowserRouter>
            <Switch>
                <Route exact path="/" component={Weather} />
                <Route exact path="/bus" component={Bus} />
            </Switch>
        </BrowserRouter>
    </Provider>,
    document.getElementById('root')
);
