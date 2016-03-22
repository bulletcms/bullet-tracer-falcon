import React from 'react';
import {Route, Redirect} from 'react-router';

class DoesNotExist extends React.Component{
  static route(){
    return <Route path='404' component={DoesNotExist}/>;
  }

  static redirect(){
    return <Redirect from='*' to='404'/>;
  }

  render(){
    return <div>
      <h1>404</h1>
      <h4>Page does not exist.</h4>
    </div>;
  }
}

export {DoesNotExist};
