import fetch from 'whatwg-fetch';
import Immutable from 'immutable';
import {timeNow} from '../util';


/* Page list
------------------------------------------*/

// SYMBOLS
const FETCH_PAGELIST = Symbol('FETCH_PAGELIST');
const FETCHING_PAGELIST = Symbol('FETCHING_PAGELIST');
const RECEIVE_PAGELIST = Symbol('RECEIVE_PAGELIST');
const ERR_PAGELIST = Symbol('ERR_PAGELIST');

// ACTION CREATORS
const fetchingPagelist = ()=>{
  return {
    type: FETCHING_PAGELIST
  };
};

const receivePagelist = (json)=>{
  return {
    type: RECEIVE_PAGELIST,
    pagelist: json
  };
};

const errPagelist = (err)=>{
  return {
    type: ERR_PAGELIST,
    err: err
  };
};

const fetchPagelist = (url)=>{
  return (dispatch)=>{
    dispatch(fetchingPagelist());

    return fetch(url)
      .then((res)=>{
        return res.json();
      })
      .then((json)=>{
        dispatch(receivePagelist(json));
      }).catch((err)=>{
        dispatch(errPagelist(err));
      });
  };
};


/* Pages
------------------------------------------*/

//SYMBOLS
const FETCH_PAGE = Symbol('FETCH_PAGE');
const FETCHING_PAGE = Symbol('FETCHING_PAGE');
const RECEIVE_PAGE = Symbol('RECEIVE_PAGE');
const ERR_PAGE = Symbol('ERR_PAGE');

// ACTION CREATORS
const fetchingPage = (url)=>{
  return {
    type: FETCHING_PAGE,
    page: url
  };
};

const receivePage = (url, json)=>{
  return {
    type: RECEIVE_PAGE,
    page: url,
    content: json
  };
};

const errPage = (url, err)=>{
  return {
    type: ERR_PAGE,
    page: url,
    error: err
  };
};

const fetchPage = (base, url)=>{
  return (dispatch)=>{
    dispatch(fetchingPage(url));

    fetch(base+'/'+url)
      .then((res)=>{
        return res.json();
      })
      .then((json)=>{
        dispatch(receivePage(url, json))
      }).catch((err)=>{
        dispatch(errPage(url, err));
      });
  };
};


/* App state
------------------------------------------*/
const defaultState = Immutable.fromJS({
  fetchingPagelist: false,
  pagelist: Immutable.Set.of('indexroute'),
  pagelistUpdatetime: 0,
  pages: Immutable.Map({})
});


/* State services
------------------------------------------*/
const MIN_UPDATE_TIME = 256;

const shouldUpdatePagelist = (state)=>{
  return !(state.get('fetchingPagelist')) && (timeNow() - state.get('pagelistUpdatetime') > MIN_UPDATE_TIME);
};

const shouldUpdatePage = (state, page)=>{
  return !(state.getIn(['pages', page])) || !(state.getIn(['pages', page, 'fetching'])) && (timeNow() - state.getIn(['pages', page, 'updatetime']) > MIN_UPDATE_TIME);
};


/* Reducer
------------------------------------------*/
const reducePage = (state=defaultState, action)=>{
  switch (action.type) {
    case FETCH_PAGELIST:
      if(shouldUpdatePagelist(state)){
        //fetchpage
      }
      return state;
    case FETCHING_PAGELIST:
      return state.set('fetchingPagelist', true);
    case RECEIVE_PAGELIST:
      return state.updateIn(['pagelist'], (list)=>{return list.union(action.pagelist.data);})
        .set('fetchingPagelist', false)
        .set('pagelistUpdatetime', timeNow());
    case ERR_PAGELIST:
      console.log('err pagelist', action.err);
      return state.set('fetchingPagelist', false);
    case FETCH_PAGE:
      if(shouldUpdatePage(state, action.page)){
        //fetchpage
      }
      return state;
    case FETCHING_PAGE:
      return state.setIn(['pages', action.page, 'fetching'], true);
    case RECEIVE_PAGE:
      return state.setIn(['pages', action.page, 'content'], action.content.data)
        .setIn(['pages', action.page, 'updatetime'], timeNow())
        .setIn(['pages', action.page, 'fetching'], false);
    case ERR_PAGE:
      console.log('err page ' + action.page, action.err);
      return state.setIn(['pages', action.page, 'fetching'], false);
    default:
      return state;
  }
};


export {};
