import React from 'react';

class Article extends React.Component {
  render(){
    // content : jsx;
    const {content} = this.props;
    return <div>
      {content}
    </div>;
  }
}

export {Article};
