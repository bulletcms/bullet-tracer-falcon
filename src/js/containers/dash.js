import React from 'react';
import {Route, Link} from 'react-router';
import {connect} from 'react-redux';
import {Services, Actions} from '../controllers';
import Immutable from 'immutable';

class Dash extends React.Component {
  static route(routeconfig){
    return <Route path={routeconfig.path} component={Dash}/>;
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
              <li className="dash-item"><Link to='/'><div>Auth</div></Link></li>
              <li className="dash-item"><Link to='/'><div>Pages</div></Link></li>
              <li className="dash-item"><Link to='/'><div>Blog</div></Link></li>
            </ul>
          </div>
        </div>
        <div className="ten column">editor</div>
      </div>
    </div>;
  }
}

export {Dash};
