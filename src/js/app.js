import React from 'react';
import {Route, IndexRoute} from 'react-router';

import {Views} from './views';

import {Components, Reducers} from './components';

import CONFIG from './config';

const {Creator} = Components;
const {DoesNotExist, Home, Page} = Views;

class App extends React.Component{
  static route(){
    return <Route path='/' component={App}>
      <IndexRoute component={Home}/>
      {DoesNotExist.route()}
      {DoesNotExist.redirect()}
      {Page.route(CONFIG.pages.about)}
    </Route>;
  }

  render(){
    return <div className='app'>
      {this.props.children}
      <Creator config={CONFIG.creator}/>
    </div>;
  }
}


export {App, Reducers};
