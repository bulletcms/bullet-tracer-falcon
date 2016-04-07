import React from 'react';
import {Route, IndexRoute} from 'react-router';

import {Views} from './views';
import {Reducers} from './controllers';
import {Containers} from './containers';

import CONFIG from './config';

const {Nav, Creator} = Views;
const {DoesNotExist, Page, Dash} = Containers;

class App extends React.Component {
  static route(){
    return <Route path='/' component={App}>
      {Page.indexroute(CONFIG.pages.home)}
      {Page.route(CONFIG.pages.about)}
      {Dash.route(CONFIG.dash)}
      {DoesNotExist.route()}
      {DoesNotExist.redirect()}
    </Route>;
  }

  render(){
    return <div className='app'>
      <Nav config={CONFIG.nav}/>
      {this.props.children}
      <Creator config={CONFIG.creator}/>
    </div>;
  }
}


export {App, Reducers};
