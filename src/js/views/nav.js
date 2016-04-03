import React from 'react';
import {Link} from 'react-router';
import Immutable from 'immutable';
import {hashCode} from '../util';

class Nav extends React.Component {
  constructor(props) {
    super(props);
    this.state = Immutable.Map({isDocked: false});
  }

  handleScroll(){
    this.setState(this.state.set('isDocked', false));
  }

  render(){
    const {links} = this.props.config;

    let listItems = [];
    for(let i of links){
      listItems.push(<li key={hashCode(i.path+i.name)} className="nav-item"><Link to={i.path}>{i.name}</Link></li>);
    }

    const navClassName = 'nav';
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
