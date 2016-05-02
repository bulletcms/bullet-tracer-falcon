import React from 'react';
import {Route, IndexRoute, Redirect, Link} from 'react-router';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {Services, Actions} from '../controllers';
import Immutable from 'immutable';
import {Editor, EditorState} from 'draft-js';

const {BulletmarkCompile} = Services;
const {resetPageEdits, editPage, newPage, modifyPageProps} = Actions;

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
  constructor(props){
    super(props);
    this.state = {data: Immutable.Map({editorState: EditorState.createEmpty()})};
    this.onChange = this.onChange.bind(this);
  }

  onChange(editorState){
    this.setState({data: this.state.data.set('editorState', editorState)});
  }

  handleAddPage(){
    const title = this.refs.newpagetitle.value;
    const path = this.refs.newpagepath.value;
    const page = this.refs.newpage.value;
    if(title.length < 1 || path.length < 1 || page.length < 1){
      console.log('need values for title, path, and page');
    } else {
      let send = {title, path, content: BulletmarkCompile(page)};

      this.refs.newpagetitle.value = '';
      this.refs.newpagepath.value = '';
      this.refs.newpage.value = '';
      console.log(send);
    }
  }

  render(){
    const editorState = this.state.data.get('editorState');
    return <div>
      <div className="title">
        <span>Pages</span>
      </div>
      <div className="content">
        <div className="container">
          <h4>New Page</h4>
          <Editor editorState={editorState} onChange={this.onChange}/>
          <input ref="newpagetitle" className="editortitle" placeholder="Page Title"/>
          <input ref="newpagepath" className="editorpath" placeholder="Page Path"/>
          <br/>
          <textarea ref="newpage" className="editor" cols="80" placeholder="Page Content"></textarea>
          <br/>
          <button className="button" onClick={this.handleAddPage.bind(this)}>Add Page</button>
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

/* Connect Redux
------------------------------------------*/
const mapStateToProps = (state, props)=>{
  const {pagepost} = state;
  let nextProps = {
    page: pagepost.get('page').toJS()
  };
  return nextProps;
};

const mapDispatchToProps = (dispatch)=>{
  return bindActionCreators({resetPageEdits, editPage, newPage, modifyPageProps}, dispatch);
};


/* Dash
------------------------------------------*/
class Dash extends React.Component {
  render(){
    return <div className="dash">
      <div className="row">
        <div className="column column-10 dash-sidebar">
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
        <div className="column column-90 dash-container">
          {this.props.children}
        </div>
      </div>
    </div>;
  }
}

Dash = connect(mapStateToProps, mapDispatchToProps)(Dash);


/* Dash Routes
------------------------------------------*/
const DashRoute = (routeconfig) => {
  return [<Route key='0' path={routeconfig.path} component={Dash}>
    <IndexRoute component={DashIndex}/>
    <Route path='auth' component={DashAuth}/>
    <Route path='pages' component={DashPages}/>
    <Route path='blog' component={DashBlog}/>
  </Route>,
  <Redirect key='1' from='dash/*' to='dash'/>];
};


export {Dash, DashRoute};
