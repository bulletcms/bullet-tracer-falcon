import React from 'react';

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
    return <div>
      <small>
        <span className="fa-stack"><i className="fa fa-square fa-stack-2x"></i><i className="fa fa-terminal fa-stack-1x fa-inverse"></i></span> with <span className="fa-stack"><i className="fa fa-heart fa-stack-1x"></i></span> by {this.nameArrToStr(names)}<br/>
        &copy; {copyright} - {new Date().getFullYear()}
      </small>
    </div>;
  }
}

export {Creator};
