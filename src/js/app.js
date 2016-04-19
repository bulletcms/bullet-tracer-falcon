import React from 'react';
import {Route, IndexRoute} from 'react-router';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import {Views} from './views';
import {Reducers, Actions} from './controllers';
// import {Containers, Routes} from './containers';
import {Routes} from './containers';
import CONFIG from './config';


const {Nav, Creator} = Views;
// const {DoesNotExist, Page, Dash} = Containers;
const {DoesNotExistRoute, PageRoute, DashRoute} = Routes;
const {fetchPagelist} = Actions;


/* Connect Redux
------------------------------------------*/
const mapStateToProps = (state)=>{
  const {reducePage} = state;
  let nextProps = {};
  nextProps.fetching = reducePage.get('fetchingPagelist');
  if(!nextProps.fetching){
    nextProps.pagelist = reducePage.get('pagelist').toJS();
    nextProps.updatetime = reducePage.get('pagelistUpdatetime');
  }
  return nextProps;
};

const mapDispatchToProps = (dispatch)=>{
  return bindActionCreators({fetchPagelist}, dispatch);
};


/* App
------------------------------------------*/
// @connect(mapStateToProps, mapDispatchToProps)
class App extends React.Component {
  componentWillMount(){
    this.props.fetchPagelist(CONFIG.api.pages);
  }

  render(){
    return <div className='app'>
      <Nav config={CONFIG.nav}/>
      {this.props.children}
      <Creator config={CONFIG.creator}/>
    </div>;
  }
}

App = connect(mapStateToProps, mapDispatchToProps)(App);


/* App Routes
------------------------------------------*/
const AppRoute = ()=>{
  // return <Route path='/' component={App}>
  //   {PageRoute(null, true, CONFIG.pages.indexroute)}
  //   {PageRoute('page')}
  //   {DashRoute(CONFIG.dash)}
  //   {DoesNotExistRoute()}
  // </Route>;
  return <Route path='/' component={App}>
    {DashRoute(CONFIG.dash)}
    {DoesNotExistRoute()}
  </Route>;
};


export {App, AppRoute, Reducers};
