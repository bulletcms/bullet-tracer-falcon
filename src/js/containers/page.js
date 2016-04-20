import React from 'react';
import {Route, IndexRoute} from 'react-router';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';

import {Services, Actions} from '../controllers';
import {Views} from '../views';
import CONFIG from '../config';


const {fetchPage} = Actions;
const {BulletmarkRender} = Services;


/* Connect Redux
------------------------------------------*/
const mapStateToProps = (state, props)=>{
  const {reducePage} = state;
  let pagepath = props.params.pagepath || CONFIG.pages.indexroute;
  console.log('pagepath', pagepath);

  let nextProps = {page: pagepath};
  nextProps.fetching = reducePage.getIn(['pages', pagepath, 'fetching']);
  if(!nextProps.fetching){
    nextProps.content = reducePage.getIn(['pages', pagepath, 'content']);
    nextProps.updatetime = reducePage.getIn(['pages', pagepath, 'updatetime']);
  }
  return nextProps;
};

const mapDispatchToProps = (dispatch)=>{
  return bindActionCreators({fetchPage}, dispatch);
};


/* Page
------------------------------------------*/
// @connect(mapStateToProps)
class Page extends React.Component {
  componentWillMount(){
    this.props.fetchPage(CONFIG.api.pages, this.props.page);
  }

  componentWillUpdate(nextProps, nextState){
    this.props.fetchPage(CONFIG.api.pages, nextProps.page);
  }

  render(){
    const {content} = this.props;
    return <div className="container">
      {(content) && BulletmarkRender(content, Views)}
    </div>;
  }
};

Page = connect(mapStateToProps, mapDispatchToProps)(Page);


/* Page Routes
------------------------------------------*/
const PageRoute = (prefix='', index=false)=>{
  if(index){
    return <IndexRoute component={Page}/>;
  } else {
    return <Route path={prefix + '/:pagepath'} component={Page}/>;
  }
};


export {Page, PageRoute};
