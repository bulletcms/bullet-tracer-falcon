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
  const {pagefetch} = state;
  let nextProps = {};
  nextProps.fetching = pagefetch.get('fetchingPagelist');
  if(!nextProps.fetching){
    nextProps.pagelist = pagefetch.get('pagelist').toJS();
    nextProps.updatetime = pagefetch.get('pagelistUpdatetime');
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
      <Nav links={CONFIG.nav.links}/>
      {this.props.children}
      <Creator names={CONFIG.creator.names} copyright={CONFIG.creator.copyright}/>
    </div>;
  }
}

App = connect(mapStateToProps, mapDispatchToProps)(App);


/* App Routes
------------------------------------------*/
const AppRoute = ()=>{
  return <Route path='/' component={App}>
    {PageRoute(null, true)}
    {PageRoute('page')}
    {DashRoute(CONFIG.dash)}
    {DoesNotExistRoute()}
  </Route>;
};


export {App, AppRoute, Reducers};
