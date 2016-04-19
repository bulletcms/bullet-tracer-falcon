import React from 'react';
import {Route, IndexRoute} from 'react-router';
import {connect} from 'react-redux';

import {Services, Actions} from '../controllers';


const {PageFetchActions: fetchPage} = Actions;
const {BulletmarkRender} = Services;


/* Connect Redux
------------------------------------------*/
const mapStateToProps = (state, props)=>{
  const {reducePage} = state;
  let pagepath = props.params.pagepath || props.route.page;
  return {
    content: reducePage.getIn(['pages', props.params.pagepath, 'content']),
    page: props.params.pagepath
  };
};


/* Page
------------------------------------------*/
// @connect(mapStateToProps)
class Page extends React.Component {
  render(){
    const {content} = this.props;
    return <div className="container">
      This is a page.
    </div>;
  }
};

Page = connect(mapStateToProps)(Page);


/* Page Routes
------------------------------------------*/
const PageRoute = (prefix='', index=false, indexpagepath='')=>{
  if(index){
    return <IndexRoute page={indexpagepath} component={Page}/>;
  } else {
    return <Route path={prefix + '/:pagepath'} component={Page}/>;
  }
};


export {Page, PageRoute};
