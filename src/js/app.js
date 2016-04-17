import React from 'react';
import {Route, IndexRoute} from 'react-router';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

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

export {Reducers};
export default connect(mapStateToProps, mapDispatchToProps)(App)
