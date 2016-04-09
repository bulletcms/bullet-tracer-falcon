import React from 'react';
import {Route, IndexRoute} from 'react-router';
import {connect} from 'react-redux';
import {Services, Actions} from '../controllers';

const {PageFetchActions: fetchPage} = Actions;
const {BulletmarkRender} = Services;

class Page extends React.Component {
  static route(prefix=''){
    //routeconfig must contain: path, format (currently only bullet json), filename (text file to parse)
    return <Route path={prefix + '/:pagepath'} component={Page}/>;
  }

  static indexroute(indexpagepath){
    return <IndexRoute page={indexpagepath} component={Page}/>;
  }

  render(){
    const {content} = this.props;
    return <div className="container">
      This is a page.
    </div>;
  }
}

const mapStateToProps = (state, props)=>{
  const {PageFetchReducer} = state;
  return {
    content: PageFetchReducer.getIn(['pages', props.params.pagepath, 'content']),
    page: props.params.pagepath
  };
};

export {Page: connect(mapStateToProps)(Page)};
