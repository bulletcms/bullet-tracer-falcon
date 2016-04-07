import React from 'react';
import {Route, IndexRoute, Redirect, Link} from 'react-router';
import {connect} from 'react-redux';
import {Services, Actions} from '../controllers';
import Immutable from 'immutable';

class DashIndex extends React.Component {
  render(){
    return <div>
      dashindex
    </div>;
  }
}

class DashAuth extends React.Component {
  render(){
    return <div>
      dashauth
    </div>;
  }
}

class DashPages extends React.Component {
  render(){
    return <div>
      dashpages
    </div>;
  }
}

class DashBlog extends React.Component {
  render(){
    return <div>
      dashblog
    </div>;
  }
}

class Dash extends React.Component {
  static route(routeconfig){
    return [<Route path={routeconfig.path} component={Dash}>
      <IndexRoute component={DashIndex}/>
      <Route path='auth' component={DashAuth}/>
      <Route path='pages' component={DashPages}/>
      <Route path='blog' component={DashBlog}/>
    </Route>,
    <Redirect from='dash/*' to='dash'/>];
  }

  render(){
    return <div>
      <div className="row">
        <div className="two column dash-sidebar">
          <Link to='/dash'><div className="dash-title">
            <span>Dashboard</span>
          </div></Link>
          <div className="dash-container">
            <ul className="dash-list">
              <li className="dash-item"><Link to='/dash/auth'><div>Auth</div></Link></li>
              <li className="dash-item"><Link to='/dash/pages'><div>Pages</div></Link></li>
              <li className="dash-item"><Link to='/dash/blog'><div>Blog</div></Link></li>
            </ul>
          </div>
        </div>
        <div className="ten column">
          {this.props.children}
        </div>
      </div>
    </div>;
  }
}

export {Dash};
