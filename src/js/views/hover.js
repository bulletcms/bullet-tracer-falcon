import React from 'react';
import Immutable from 'immutable';

class Hover extends React.Component {
  constructor(props) {
    super(props);
    this.state = {data: Immutable.Map({isHovering: false})};
    this.handleMouseOver = this.handleMouseOver.bind(this);
    this.handleMouseOut = this.handleMouseOut.bind(this);
  }

  handleMouseOver(){
    this.setState({data: this.state.data.set('isHovering', true)});
  }

  handleMouseOut(){
    this.setState({data: this.state.data.set('isHovering', false)});
  }

  shouldComponentUpdate(nextProps, nextState){
    return this.state.data.equals(nextState.data);
  }

  render(){
    // defaultview, hoverview : jsx;
    const {defaultview, hoverview} = this.props;
    let finalview = defaultview;
    if(this.state.data.get('isHovering')){
      finalview = hoverview;
    }
    return <span onMouseOver={this.handleMouseOver} onMouseOut={this.handleMouseOut}>{finalview}</span>;
  }
}

export {Hover};
