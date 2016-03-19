import React from 'react';
import {Route} from 'react-router';

class Page extends React.Component {
  static route(routeconfig){
    //routeconfig must contain: path, format (either markdown or html), filename (text file to parse)
    return <Route path={routeconfig.path} config={routeconfig} component={HomeComponent}/>;
  }

  render(){
    return <div>
      This is home.
    </div>;
  }
}

export {Page};
