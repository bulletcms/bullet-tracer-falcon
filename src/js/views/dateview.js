import React from 'react';
import moment from 'moment';
import {Hover} from './hover';

class DateView extends React.Component {
  render(){
    // date : unixseconds; author : string or jsx;
    const {date, author} = this.props;
    return <span>
      {(author) ? <span><strong>{author}</strong> | </span> : ''}
      {(date) ? <Hover defaultview={moment.unix(date).fromNow()} hoverview={moment.unix(date).format('YYYY-MM-DD HH:mm:ss ZZ')}/> : ''}
    </span>;
  }
}

export {DateView};
