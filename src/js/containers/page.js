import React from 'react';
import {Route, IndexRoute} from 'react-router';
import {connect} from 'react-redux';

import {Services, Actions} from '../controllers';


const {PageFetchActions: fetchPage} = Actions;
const {BulletmarkRender} = Services;


const mapStateToProps = (state, props)=>{
  const {PageFetchReducer} = state;
  return {
    content: PageFetchReducer.getIn(['pages', props.params.pagepath, 'content']),
    page: props.params.pagepath
  };
};

@connect(mapStateToProps)
class Page extends React.Component {
  render(){
    const {content} = this.props;
    return <div className="container">
      This is a page.
    </div>;
  }
}


const PageRoute = (prefix='', index=false, indexpagepath='')=>{
  if(index){
    return <IndexRoute page={indexpagepath} component={Page}/>;
  } else {
    return <Route path={prefix + '/:pagepath'} component={Page}/>;
  }
}


export {Page, PageRoute};
