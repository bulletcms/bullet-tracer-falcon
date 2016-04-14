import React from 'react';
import ReactDOM from 'react-dom';

import {createStore, combineReducers, applyMiddleware} from 'redux';
import thunkMiddleware from 'redux-thunk';
import {Provider} from 'react-redux';
import {Router, Route, browserHistory} from 'react-router';
import {syncHistoryWithStore, routerReducer} from 'react-router-redux';

import {App, Reducers} from './app';

const store = createStore(
  combineReducers({
    ...Reducers,
    routing: routerReducer
  }),
  applyMiddleware(thunkMiddleware)
);

const history = syncHistoryWithStore(browserHistory, store);

ReactDOM.render(
  <Provider store={store}>
    <Router history={history}>
      {App.route()}
    </Router>
  </Provider>,
  document.getElementById('mount')
);
