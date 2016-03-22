import React from 'react';
import {Route} from 'react-router';

class Home extends React.Component {
  static route(){
    return <Route path='home' component={Home}/>;
  }

  render(){
    return <div>
      This is home.
    </div>;
  }
}

export {Home};
