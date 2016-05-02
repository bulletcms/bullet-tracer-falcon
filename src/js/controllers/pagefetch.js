import 'whatwg-fetch';
import Immutable from 'immutable';
import {replace} from 'react-router-redux';
import {timeNow} from '../util';


/* App state
------------------------------------------*/
const defaultState = Immutable.fromJS({
  fetchingPagelist: false,
  pagelist: Immutable.Set.of('indexroute'),
  pagelistUpdatetime: 0,
  pages: Immutable.Map({}),
  pagequeue: Immutable.Map({base: '', page: ''})
});


/* State services
------------------------------------------*/
const MIN_UPDATE_TIME = 256;

const shouldUpdatePagelist = (state)=>{
  // should update if: (pagelist is NOT fetching currently) AND (time to last pagelist updatetime is greater than the minimum)
  return !(state.get('fetchingPagelist')) && (timeNow() - state.get('pagelistUpdatetime') > MIN_UPDATE_TIME);
};

const shouldUpdatePage = (state, page)=>{
  // should update if: (page does NOT exist) OR (page is NOT fetching currently AND time to last page updatetime is greater than the minimum)
  return !(state.getIn(['pages', page])) || !(state.getIn(['pages', page, 'fetching'])) && (timeNow() - state.getIn(['pages', page, 'updatetime']) > MIN_UPDATE_TIME);
};

const shouldWaitForPagelist = (state)=>{
  return state.get('fetchingPagelist');
};

const hasElementInQueue = (state)=>{
  return state.getIn(['pagequeue', 'page']).length > 0;
};

const pagelistHasPage = (state, page)=>{
  return state.get('pagelist').has(page);
};


/* Pages
------------------------------------------*/

//SYMBOLS
const QUEUE_PAGE = Symbol('QUEUE_PAGE');
const CLEAR_QUEUE_PAGE = Symbol('CLEAR_QUEUE_PAGE');
const FETCH_PAGE = Symbol('FETCH_PAGE');
const FETCHING_PAGE = Symbol('FETCHING_PAGE');
const RECEIVE_PAGE = Symbol('RECEIVE_PAGE');
const ERR_PAGE = Symbol('ERR_PAGE');

// ACTION CREATORS
const queuePage = (base, url)=>{
  return {
    type: QUEUE_PAGE,
    base: base,
    page: url
  };
};

const clearQueuePage = ()=>{
  return {
    type: CLEAR_QUEUE_PAGE
  };
};

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
    json: json
  };
};

const errPage = (url)=>{
  return {
    type: ERR_PAGE,
    page: url
  };
};

const fetchPage = (base, url)=>{
  if(typeof base != 'string'){
    console.log('err fetchpagelist: base must be string, base: ', base);
    return;
  }
  if(typeof url != 'string'){
    console.log('err fetchpagelist: url must be string, url: ', url);
    return;
  }

  return (dispatch, getState)=>{
    if(shouldUpdatePage(getState().pagefetch, url)){
      if(shouldWaitForPagelist(getState().pagefetch)){
        dispatch(queuePage(base, url));
      } else if(pagelistHasPage(getState().pagefetch, url)){
        dispatch(fetchingPage(url));
        return fetch(base+'/'+url)
          .then((res)=>{
            return res.json();
          })
          .then((json)=>{
            dispatch(receivePage(url, json));
          }).catch((err)=>{
            console.log(err);
            dispatch(errPage(url));
          });
      } else {
        dispatch(replace('/404'));
      }
    }
    return Promise.resolve();
  };
};


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

const errPagelist = ()=>{
  return {
    type: ERR_PAGELIST
  };
};

const fetchPagelist = (url)=>{
  if(typeof url != 'string'){
    console.log('err fetchpagelist: url must be string, url: ', url);
    return;
  }
  return (dispatch, getState)=>{
    if(shouldUpdatePagelist(getState().pagefetch)){
      dispatch(fetchingPagelist());

      return fetch(url)
        .then((res)=>{
          return res.json();
        })
        .then((json)=>{
          dispatch(receivePagelist(json));
          if(hasElementInQueue(getState().pagefetch)){
            const queue = getState().pagefetch.get('pagequeue');
            dispatch(fetchPage(queue.get('base'), queue.get('page')));
            dispatch(clearQueuePage());
          }
        }).catch((err)=>{
          console.log(err);
          dispatch(errPagelist());
        });
    } else {
      return Promise.resolve();
    }
  };
};


/* Reducer
------------------------------------------*/
const pagefetch = (state=defaultState, action)=>{
  switch (action.type) {
    // Pagelist
    case FETCHING_PAGELIST:
      return state.set('fetchingPagelist', true);
    case RECEIVE_PAGELIST:
      return state.updateIn(['pagelist'], (list)=>{return list.union(action.pagelist.data);})
        .set('fetchingPagelist', false)
        .set('pagelistUpdatetime', timeNow());
    case ERR_PAGELIST:
      return state.set('fetchingPagelist', false);
    // Pages
    case QUEUE_PAGE:
      return state.set('pagequeue', Immutable.Map({base: action.base, page: action.page}));
    case CLEAR_QUEUE_PAGE:
      return state.set('pagequeue', Immutable.Map({base: '', page: ''}));
    case FETCHING_PAGE:
      return state.setIn(['pages', action.page, 'fetching'], true);
    case RECEIVE_PAGE:
      return state.setIn(['pages', action.page], Immutable.Map({
        content: action.json.data.content,
        title: action.json.data.title,
        tags: action.json.data.tags,
        updatetime: timeNow(),
        fetching: false
      }));
    case ERR_PAGE:
      return state.setIn(['pages', action.page, 'fetching'], false);
    default:
      return state;
  }
};


const PagefetchActions = {fetchPagelist, fetchPage};
const PagefetchReducers = {pagefetch};

export {PagefetchActions, PagefetchReducers};
