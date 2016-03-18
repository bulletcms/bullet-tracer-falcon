import React from 'react';
import {Route, IndexRoute} from 'react-router';

import {Views} from './views';

import {Components, Reducers} from './components';

import CONFIG from './config';

const {Creator} = Components;
const {DoesNotExist, Home} = Views;

const {creator} = CONFIG;

class App extends React.Component{
  static route(){
    return <Route path='/' component={App}>
      <IndexRoute component={Home}/>
      {DoesNotExist.route()}
      {DoesNotExist.redirect()}
    </Route>;
  }

  render(){
    return <div className='app'>
      Hello?
      // {this.props.children}
      // <Creator config={creator}/>
    </div>;
  }
}


export {App, Reducers};
