import React from 'react';
import {Route} from 'react-router';
import {connect} from 'react-redux';
import {Services, Actions} from '../controllers';
import Immutable from 'immutable';

class Dash extends React.Component {
  static route(routeconfig){
    return <Route path={routeconfig.path} component={Dash}/>;
  }

  render(){
    return <div>
      i'm the dashboard.
    </div>;
  }
}

export {Dash};
