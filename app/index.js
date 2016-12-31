
import App from './modules/app';
import {hashHistory, Route, Router} from 'react-router';
import React from 'react';
import {render} from 'react-dom';

import '../sass/main.scss';

render((
    <Router history={hashHistory}>
        <Route path="/" component={App}>
        </Route>
    </Router>
), document.getElementById('app'));

