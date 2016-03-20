import React from 'react';
import Immutable from 'immutable';

class Hover extends React.Component {
  constructor(props) {
    super(props);
    this.state = Immutable.map({isHovering: false});
  }

  handleMouseOver(){
    this.setState(this.state.set('isHovering', true));
  }

  handleMouseOut(){
    this.setState(this.state.set('isHovering', false));
  }

  render(){
    // defaultview, hoverview : jsx;
    const {defaultview, hoverview} = this.props;
    let finalview = defaultview;
    if(this.state.get('isHovering')){
      finalview = hoverview;
    }
    return <span>{finalview}</span>;
  }
}

export {Hover};
