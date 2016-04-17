import React from 'react';
import {Route, Redirect} from 'react-router';

class DoesNotExist extends React.Component{
  render(){
    return <div>
      <h1>404</h1>
      <h4>Page does not exist.</h4>
    </div>;
  }
}

const DoesNotExistRoute = ()=>{
  // must always place this route last, else redirect will catch all routes
  return [<Route key='0' path='404' component={DoesNotExist}/>, <Redirect key='1' from='*' to='404'/>];
}

export {DoesNotExist, DoesNotExistRoute};
