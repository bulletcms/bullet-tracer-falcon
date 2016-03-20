import React from 'react';
import {Route} from 'react-router';

class Page extends React.Component {
  static route(routeconfig){
    //routeconfig must contain: path, format (currently only bullet json), filename (text file to parse)
    return <Route path={routeconfig.path} config={routeconfig} component={Page}/>;
  }

  render(){
    const {path, format, filename} = this.props.route;
    return <div>
      This is home.
    </div>;
  }
}

export {Page};
