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


const mapStateToProps = (state)=>{
  console.log('hello');
  const {reducePage} = state;
  let nextProps = {};
  nextProps.fetching = reducePage.get('fetchingPagelist');
  if(!nextProps.fetching){
    nextProps.pagelist = reducePage.get('pagelist').toJS();
    nextProps.updatetime = reducePage.get('pagelistUpdatetime');
  }
  console.log('nextProps', nextProps);
  return nextProps;
};

const mapDispatchToProps = (dispatch)=>{
  console.log('hello2');
  return bindActionCreators({fetchPagelist}, dispatch);
};

@connect(mapStateToProps, mapDispatchToProps)
class App extends React.Component {
  componentWillMount(){
    console.log('will mount', this.props, this.props.fetchPagelist);
    // this.props.dispatch(fetchPagelist(CONFIG.pages.base));
  }

  componentDidMount(){
    console.log('did mount', this.props);
  }

  render(){
    console.log('render', this.props);
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


const AppRoute = ()=>{
  // return <Route path='/' component={App}>
  //   {PageRoute(null, true, 'home')}
  //   {DashRoute(CONFIG.dash)}
  //   {PageRoute('p')}
  //   {DoesNotExistRoute()}
  // </Route>;
  return <Route path='/' component={App}>
    {DashRoute(CONFIG.dash)}
    {DoesNotExistRoute()}
  </Route>;
};


export {App, AppRoute, Reducers};
