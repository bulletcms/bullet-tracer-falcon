import React from 'react';
import {Route, IndexRoute, Redirect, Link} from 'react-router';
import {connect} from 'react-redux';
import {Services, Actions} from '../controllers';
import Immutable from 'immutable';

class DashIndex extends React.Component {
  render(){
    return <div>
      <div className="title">
        <span>The Dashboard</span>
      </div>
      <div className="content">

      </div>
    </div>;
  }
}

class DashAuth extends React.Component {
  render(){
    return <div>
      <div className="title">
        <span>Authentication</span>
      </div>
    </div>;
  }
}

class DashPages extends React.Component {
  render(){
    return <div>
      <div className="title">
        <span>Pages</span>
      </div>
      <div className="content">
        <div className="container">
          <h4>New Page</h4>
          <input id="newpagetitle" className="editortitle" placeholder="Page Title"/><br/>
          <textarea id="newpage" className="editor" cols="80" placeholder="Page Content"></textarea><br/>
          <button className="button">Add Page</button>
          <hr/>
          <h4>Pages</h4>
          <ul className="list">
            <li className="list-item">
              <div>
                <span className="name">i am a page</span>
                <ul className="options">
                  <li className="option">option 1</li>
                  <li className="option">option 2</li>
                  <li className="option">option 3</li>
                </ul>
              </div>
            </li>
            <li className="list-item">
              <div>
                <span className="name">i am a page</span>
                <ul className="options">
                  <li className="option">option 1</li>
                  <li className="option">option 2</li>
                  <li className="option">option 3</li>
                </ul>
              </div>
            </li>
          </ul>
          <hr/>
        </div>
      </div>
    </div>;
  }
}

class DashBlog extends React.Component {
  render(){
    return <div>
      <div className="title">
        <span>Blog</span>
      </div>
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
          <div className="dash-sidebar-container">
            <ul className="dash-list">
              <li className="dash-item"><Link to='/dash/auth'><div>Auth</div></Link></li>
              <li className="dash-item"><Link to='/dash/pages'><div>Pages</div></Link></li>
              <li className="dash-item"><Link to='/dash/blog'><div>Blog</div></Link></li>
            </ul>
          </div>
        </div>
        <div className="ten column dash-container">
          {this.props.children}
        </div>
      </div>
    </div>;
  }
}

export {Dash};
