import React from 'react';
import moment from 'moment';
import {Hover} from './hover';

class DateView extends React.Component {
  static get propTypes() {
    // date : unixseconds; author : string or jsx;
    return {
      date: React.PropTypes.number,
      author: React.PropTypes.node
    };
  }

  render(){
    const {date, author} = this.props;
    return <span>
      {(author) && <span><strong>{author}</strong> | </span>}
      {(date) && <Hover defaultview={moment.unix(date).fromNow()} hoverview={moment.unix(date).format('YYYY-MM-DD HH:mm:ss ZZ')}/>}
    </span>;
  }
}

export {DateView};
