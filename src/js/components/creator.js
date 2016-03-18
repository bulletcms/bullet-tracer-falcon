import React from 'react';

const style = {
  creatorText: {
    fontSize: '12px'
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
      created with &hearts; by {this.nameArrToStr(names)}<br/>
      &copy; {copyright} - {new Date().getFullYear()}
    </div>;
  }
}

export {Creator};
