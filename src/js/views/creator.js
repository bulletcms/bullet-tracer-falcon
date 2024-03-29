import React from 'react';

class Creator extends React.Component{
  static get propTypes() {
    return {
      names: React.PropTypes.arrayOf(React.PropTypes.string).isRequired,
      copyright: React.PropTypes.number
    };
  }

  nameArrToStr(nameArr){
    let k = '';
    let len = nameArr.length;
    switch(len){
      case 0:
        break;
      case 1:
        k += nameArr[0];
        break;
      case 2:
        k += nameArr[0] + ' and ' + nameArr[1];
        break;
      default:
        for(let i=0; i < len-1; i++){
          k += nameArr[i] + ', ';
        }
        k += 'and ' + nameArr[len-1];
        break;
    }
    return k;
  }

  render(){
    const {names, copyright} = this.props;
    return <div>
      <small>
        <span className="fa-stack">
          <i className="fa fa-code fa-stack-1x"></i>
        </span>
        with
        <span className="fa-stack">
          <i className="fa fa-heart fa-stack-1x"></i>
        </span>
        by {this.nameArrToStr(names)} {(copyright) && <span>&copy; {copyright} - {new Date().getFullYear()}</span>}
      </small>
    </div>;
  }
}

export {Creator};
