
import {createStore} from 'redux';
import {Provider} from 'react-redux';
import React from 'react';
import ReactDOM from 'react-dom';
import rootReducer from './reducers/index';
import Wifi from './containers/wifi';

const store = createStore(rootReducer);

ReactDOM.render(
    <Provider store={store}>
      <Wifi />
    </Provider>,
    document.getElementById('root')
);
