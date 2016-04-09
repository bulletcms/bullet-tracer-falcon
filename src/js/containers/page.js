import React from 'react';
import {Route, IndexRoute} from 'react-router';
import {connect} from 'react-redux';
import {Services, Actions} from '../controllers';

const {PageFetchActions: fetchPage} = Actions;
const {BulletmarkRender} = Services;

class Page extends React.Component {
  static route(routeconfig){
    //routeconfig must contain: path, format (currently only bullet json), filename (text file to parse)
    return <Route path={routeconfig.path} config={routeconfig} component={Page}/>;
  }

  static indexroute(routeconfig){
    return <IndexRoute config={routeconfig} component={Page}/>;
  }

  render(){
    const {path, format, filename} = this.props.route.config;
    return <div className="container">
      This is {filename}.
    </div>;
  }
}

const mapStateToProps = (state)=>{
  const {PageFetchReducer} = state;
  return {
    content: PageFetchReducer.getIn(['pages', PageFetchReducer.get('page'), 'content'])
  };
};

export {Page: connect(mapStateToProps)(Page)};
