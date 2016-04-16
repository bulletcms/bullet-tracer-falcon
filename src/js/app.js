import React from 'react';
import {Route, IndexRoute} from 'react-router';
import {connect} from 'react-redux';

import {Views} from './views';
import {Reducers, Actions} from './controllers';
import {Containers} from './containers';

import CONFIG from './config';

const {Nav, Creator} = Views;
const {DoesNotExist, Page, Dash} = Containers;
const {fetchPagelist} = Actions;


class App extends React.Component {
  static route(){
    // return <Route path='/' component={App}>
    //   {Page.indexroute('home')}
    //   {Dash.route(CONFIG.dash)}
    //   {Page.route('p')}
    //   {DoesNotExist.route()}
    // </Route>;
    return <Route path='/' component={App}>
      {Dash.route(CONFIG.dash)}
      {DoesNotExist.route()}
    </Route>;
  }

  componentWillMount(){
    console.log(this.props);
    this.props.dispatch(fetchPagelist(CONFIG.pages.base));
  }

  render(){
    // return <div className='app'>
    //   <Nav config={CONFIG.nav}/>
    //   {this.props.children}
    //   <Creator config={CONFIG.creator}/>
    // </div>;
    return <div className='app'>
      <Nav config={CONFIG.nav}/>
      {this.props.fetching && <span>fetching</span>}
      {!this.props.fetching && this.props.pagelist}
      {!this.props.fetching && this.props.updatetime}
      <Creator config={CONFIG.creator}/>
    </div>;
  }
}

const mapStateToProps = (state, props)=>{
  const {reducePage} = state;
  let nextProps = {};
  nextProps.fetching = reducePage.get('fetchingPagelist');
  if(!nextProps.fetching){
    nextProps.pagelist = reducePage.get('pagelist').toJS();
    nextProps.updatetime = reducePage.get('pagelistUpdatetime');
  }
  return nextProps;
};

App = connect(mapStateToProps)(App);
export {App, Reducers};
