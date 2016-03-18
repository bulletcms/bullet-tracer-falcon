import React from 'react';

const style = {
  creatorText: {
    fontSize: '0.75rem'
  }
}

class Creator extends React.Component{
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
    let {names, copyright} = this.props.config;
    return <div style={style.creatorText}>
      <span className="fa-stack"><i className="fa fa-square fa-stack-2x"></i><i className="fa fa-terminal fa-stack-1x fa-inverse"></i></span> with <i className="fa fa-heart"></i> by {this.nameArrToStr(names)}<br/>
      &copy; {copyright} - {new Date().getFullYear()}
    </div>;
  }
}

export {Creator};
