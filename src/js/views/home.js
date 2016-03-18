import React from 'react';
import {Route} from 'react-router';

// import HeaderComponent from '../header/header.jsx';
//
// import CountdownComponent from '../countdown/countdown.jsx';


class Home extends React.Component {
  static route(){
    return <Route path='home' component={HomeComponent}/>;
  }

  render(){
    return <div>
      This is home.
    </div>;
  }
}

export {Home};
