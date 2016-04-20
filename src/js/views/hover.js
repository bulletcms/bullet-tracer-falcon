import React from 'react';
import Immutable from 'immutable';

class Hover extends React.Component {
  static get propTypes() {
    return {
      defaultview: React.PropTypes.node.isRequired,
      hoverview: React.PropTypes.node.isRequired
    };
  }

  constructor(props) {
    super(props);
    this.state = {data: Immutable.Map({isHovering: false})};
    this.handleMouseEnter = this.handleMouseEnter.bind(this);
    this.handleMouseLeave = this.handleMouseLeave.bind(this);
  }

  handleMouseEnter(){
    this.setState({data: this.state.data.set('isHovering', true)});
  }

  handleMouseLeave(){
    this.setState({data: this.state.data.set('isHovering', false)});
  }

  shouldComponentUpdate(nextProps, nextState){
    return !(this.state.data.equals(nextState.data));
  }

  render(){
    // defaultview, hoverview : jsx;
    const {defaultview, hoverview} = this.props;
    let finalview = defaultview;
    if(this.state.data.get('isHovering')){
      finalview = hoverview;
    }
    return <span onMouseEnter={this.handleMouseEnter} onMouseLeave={this.handleMouseLeave}>{finalview}</span>;
  }
}

export {Hover};
