import React from 'react';
import ReactDOM from 'react-dom';
import {Link} from 'react-router';
import Immutable from 'immutable';
import {hashCode} from '../util';

class Nav extends React.Component {
  constructor(props) {
    super(props);
    this.state = {data: Immutable.Map({isDocked: false})};
    this.updating = false;
  }

  calculateDocked(){
    this.setState({data: this.state.data.set('isDocked', ReactDOM.findDOMNode(this).getBoundingClientRect().top <= 0)});
    this.updating = false;
  }

  handleScroll(){
    if(!this.updating){
      window.requestAnimationFrame(this.calculateDocked.bind(this));
    }
    this.updating = true;
  }

  shouldComponentUpdate(nextProps, nextState){
    return this.state.data.equals(nextState.data);
  }

  componentDidMount(){
    this.scrollListener = this.handleScroll.bind(this);

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

    let navClassName = 'nav';
    if(this.state.data.get('isDocked')){
      navClassName += ' docked';
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
