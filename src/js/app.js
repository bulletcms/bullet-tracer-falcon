import React from 'react';
import {Route, IndexRoute} from 'react-router';

import {Views} from './views';
import {Actions, Reducers} from './controllers';
import {Containers} from './containers';

import CONFIG from './config';

const {Creator} = Views;
const {DoesNotExist, Home, Page} = Containers;

class App extends React.Component {
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
