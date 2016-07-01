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
    return <section>
      <div className="page-header">
        <h1>The Dashboard</h1>
      </div>
      <div>

      </div>
    </section>;
  }
}

class DashAuth extends React.Component {
  render(){
    return <section>
      <div className="page-header">
        <h1>Authentication</h1>
      </div>
    </section>;
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
    return <section>
      <div className="page-header">
        <h1>Pages</h1>
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
                  <li className="option"><a>option 1</a></li>
                  <li className="option"><a>option 2</a></li>
                  <li className="option"><a>option 3</a></li>
                </ul>
              </div>
            </li>
            <li className="list-item">
              <div>
                <span className="name">i am a page</span>
                <ul className="options">
                  <li className="option"><a>option 1</a></li>
                  <li className="option"><a>option 2</a></li>
                  <li className="option"><a>option 3</a></li>
                </ul>
              </div>
            </li>
          </ul>
          <hr/>
        </div>
      </div>
    </section>;
  }
}

class DashBlog extends React.Component {
  render(){
    return <section>
      <div className="page-header">
        <h1>Blog</h1>
      </div>
    </section>;
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
    return <div className="grid-strict">
      <div className="row">
        <div className="col col8-1 sidebar">
          <Link to='/dash'><div className="title">
            <h2>Dashboard</h2>
          </div></Link>
          <ul className="list">
            <li className="list-item"><Link to='/dash/auth'><div>Auth</div></Link></li>
            <li className="list-item"><Link to='/dash/pages'><div>Pages</div></Link></li>
            <li className="list-item"><Link to='/dash/blog'><div>Blog</div></Link></li>
          </ul>
        </div>
        <div className="col col8-7">
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
