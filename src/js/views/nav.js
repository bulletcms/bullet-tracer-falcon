import React from 'react';
import ReactDOM from 'react-dom';
import {Link} from 'react-router';
import Immutable from 'immutable';
import {hashCode} from '../util';

class Nav extends React.Component {
  constructor(props) {
    super(props);
    this.state = Immutable.Map({isDocked: false});
    this.updating = false;
  }

  calculateDocked(){
    console.log('oldstate', this.state);
    this.setState(this.state.set('isDocked', false));
    console.log('newstate', this.state);
    this.updating = false;
  }

  handleScroll(){
    if(!this.updating){
      window.requestAnimationFrame(this.calculateDocked.bind(this));
    }
    this.updating = true;
  }

  componentDidMount(){
    this.scrollListener = this.handleScroll.bind(this);
    this.domNode = ReactDOM.findDOMNode(this);
    window.addEventListener('scroll', this.scrollListener);
  }

  componentWillUnmount(){
    window.removeEventListener('scroll', this.scrollListener);
  }

  render(){
    const {links} = this.props.config;

    let listItems = [];
    for(let i of links){
      listItems.push(<li key={hashCode(i.path+i.name)} className="nav-item"><Link to={i.path}>{i.name}</Link></li>);
    }

    const navClassName = 'nav';
    console.log('rendertimestate', this.state);
    if(this.state.get('isDocked')){
      docked += ' docked';
    }

    return <nav className={navClassName}>
      <div className="nav-spacer"></div>
      <div className="nav-container">
        <div className="container">
          <ul className="nav-list">
            {listItems}
          </ul>
        </div>
      </div>
    </nav>;
  }
}

export {Nav};
